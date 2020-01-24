from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from wonder_server.settings import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
import uuid
import boto
import boto3
import os
from boto.s3.key import Key
import urllib3
from io import BytesIO
from PIL import Image
import base64


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def upload_image(request):
    src = request.data['src']
    imgstr = src.split(';base64,')[1]

    uploaded_url = upload_profile_to_s3(imgstr, 'blob')

    return Response(data={'uploaded_url': uploaded_url}, status=status.HTTP_200_OK)


# TODO : boto boto3로 대체할 것

def upload_profile_to_s3(src, src_type):
    conn = boto.s3.connect_to_region('ap-northeast-2',
                                     aws_access_key_id=AWS_ACCESS_KEY_ID,
                                     aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
    bucket = conn.get_bucket('flova')
    k = Key(bucket)
    name = str(uuid.uuid4())
    k.key = name+'.png'

    if src_type == 'blob':
        src = base64.b64decode(src)
        img = BytesIO(src)
    elif src_type == 'url':
        http = urllib3.PoolManager()
        r = http.request('GET', src, preload_content=False)
        img = BytesIO(r.read())
    else:
        return 'not supported src type'

    opened_img = Image.open(img)

    width = opened_img.size[0]
    height = opened_img.size[1]

    if width < height:
        size = width
    else:
        size = height

    croped_img = opened_img.crop(
        (
            width/2 - size/2,
            height/2 - size/2,
            width/2 + size/2,
            height/2 + size/2,
        )
    )

    resized_img = croped_img.resize((300, 300), Image.NEAREST)
    out_image = BytesIO()
    resized_img.save(out_image, 'PNG')
    k.set_contents_from_string(out_image.getvalue())
    k.set_acl('public-read')
    return 'https://s3.ap-northeast-2.amazonaws.com/flova/'+name+'.png'


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_signed_url(request):
    s3 = boto3.client('s3', region_name='ap-northeast-2', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

    fields = {"acl": "public-read"}

    conditions = [
        {"acl": "public-read"},
        ["content-length-range", 1, 78643200]
    ]

    key = str(uuid.uuid4()) + '.' + request.query_params['extension']

    post = s3.generate_presigned_post(
        Bucket='flova',
        Key=key,
        Fields=fields,
        Conditions=conditions
    )

    return Response(data=post, status=status.HTTP_200_OK)