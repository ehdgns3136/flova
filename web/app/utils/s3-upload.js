import request from './request';


export default function requestS3Upload(file) {
  return new Promise((resolve, reject) => {
    try {
      const extension = file.name.split('.').pop();

      request(`${API_ROOT}/s3/get_signed_url/?extension=${extension}`, {
        method: 'GET',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }).then((signedUrl) => {
        const formData = new FormData();

        Object.keys(signedUrl.fields).forEach((fieldName) => {
          formData.append(fieldName, signedUrl.fields[fieldName]);
        });

        formData.append('file', file); // file을 마지막에 넣어야함

        return request(signedUrl.url, {
          method: 'POST',
          body: formData,
        }).then(() => {
          resolve(`${signedUrl.url}/${signedUrl.fields.key}`);
        });
      });
    } catch (err) {
      reject();
    }
  });
}
