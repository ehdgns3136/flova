def make_push_notification(data):
    notification_data = {
        'description': get_description(data),
        'image': get_image(data),
        'url': get_url(data),
    }
    return notification_data


def get_description(data):
    notification_type = data['type']
    if notification_type == 'NewAnswerOnQuestionNotification':
        writer_name = data['recent_writer']['name']
        writer_count = data['writer_count']
        question_title = data['question']['title']
        if len(question_title) > 20:
            sliced_question_title = question_title[:20] + '...'
        else:
            sliced_question_title = question_title

        if writer_count > 1:
            return '%s님 외 %d명이 질문 %s에 답변을 달았습니다.' % (writer_name, writer_count - 1, sliced_question_title)
        else:
            return '%s님이 질문 %s에 답변을 달았습니다.' % (writer_name, sliced_question_title)
    elif notification_type == 'FollowYourQuestionNotification':
        follower_name = data['recent_follower']['name']
        follower_count = data['follower_count']
        question_title = data['question']['title']
        if len(question_title) > 20:
            sliced_question_title = question_title[:20] + '...'
        else:
            sliced_question_title = question_title

        if follower_count > 1:
            return '%s님 외 %d명이 질문 %s을 팔로우했습니다.' % (follower_name, follower_count - 1, sliced_question_title)
        else:
            return '%s님이 질문 %s을 팔로우했습니다.' % (follower_name, sliced_question_title)
    elif notification_type == 'NewCommentOnYourQuestionNotification':
        writer_name = data['recent_writer']['name']
        writer_count = data['writer_count']
        question_title = data['question']['title']
        if len(question_title) > 20:
            sliced_question_title = question_title[:20] + '...'
        else:
            sliced_question_title = question_title

        if writer_count > 1:
            return '%s님 외 %d명이 질문 %s에 댓글을 남겼습니다.' % (writer_name, writer_count - 1, sliced_question_title)
        else:
            return '%s님이 질문 %s에 댓글을 남겼습니다.' % (writer_name, sliced_question_title)
    elif notification_type == 'LikeYourAnswerNotification':
        liker_name = data['recent_liker']['name']
        liker_count = data['liker_count']
        question_title = data['question']['title']
        if len(question_title) > 20:
            sliced_question_title = question_title[:20] + '...'
        else:
            sliced_question_title = question_title

        if liker_count > 1:
            return '%s님 외 %d명이 질문 %s에 대한 회원님의 답변을 좋아합니다.' % (liker_name, liker_count - 1, sliced_question_title)
        else:
            return '%s님이 질문 %s에 대한 회원님의 답변을 좋아합니다.' % (liker_name, sliced_question_title)
    elif notification_type == 'NewCommentOnYourAnswerNotification':
        writer_name = data['recent_writer']['name']
        writer_count = data['writer_count']
        question_title = data['question']['title']
        if len(question_title) > 20:
            sliced_question_title = question_title[:20] + '...'
        else:
            sliced_question_title = question_title

        if writer_count > 1:
            return '%s님 외 %d명이 질문 %s에 대한 회원님의 답변에 댓글을 남겼습니다.' % (writer_name, writer_count - 1, sliced_question_title)
        else:
            return '%s님이 질문 %s에 대한 회원님의 답변에 댓글을 남겼습니다.' % (writer_name, sliced_question_title)
    elif notification_type == 'LikeYourQuestionCommentNotification':
        liker_name = data['recent_liker']['name']
        liker_count = data['liker_count']
        comment_content = data['comment_content']
        if len(comment_content) > 20:
            sliced_comment_content = comment_content[:20] + '...'
        else:
            sliced_comment_content = comment_content

        if liker_count > 1:
            return '%s님 외 %d명이 회원님의 댓글을 좋아합니다: %s' % (liker_name, liker_count - 1, sliced_comment_content)
        else:
            return '%s님이 회원님의 댓글을 좋아합니다: %s' % (liker_name, sliced_comment_content)
    elif notification_type == 'LikeYourAnswerCommentNotification':
        liker_name = data['recent_liker']['name']
        liker_count = data['liker_count']
        comment_content = data['comment_content']
        if len(comment_content) > 20:
            sliced_comment_content = comment_content[:20] + '...'
        else:
            sliced_comment_content = comment_content

        if liker_count > 1:
            return '%s님 외 %d명이 회원님의 댓글을 좋아합니다: %s' % (liker_name, liker_count - 1, sliced_comment_content)
        else:
            return '%s님 회원님의 댓글을 좋아합니다: %s' % (liker_name, sliced_comment_content)
    elif notification_type == 'FollowYouNotification':
        follower_name = data['recent_follower']['name']
        follower_count = data['follower_count']
        if follower_count > 1:
            return '%s님 외 %d명이 회원님을 팔로우합니다.' % (follower_name, follower_count - 1)
        else:
            return '%s님이 회원님을 팔로우합니다.' % (follower_name)
    elif notification_type == 'CustomNotification':
        return data['text']
    else:
        return ''

def get_image(data):
    notification_type = data['type']
    if notification_type == 'NewAnswerOnQuestionNotification':
        return data['recent_writer']['profile_image']
    elif notification_type == 'FollowYourQuestionNotification':
        return data['recent_follower']['profile_image']
    elif notification_type == 'NewCommentOnYourQuestionNotification':
        return data['recent_writer']['profile_image']
    elif notification_type == 'LikeYourAnswerNotification':
        return data['recent_liker']['profile_image']
    elif notification_type == 'NewCommentOnYourAnswerNotification':
        return data['recent_writer']['profile_image']
    elif notification_type == 'LikeYourQuestionCommentNotification':
        return data['recent_liker']['profile_image']
    elif notification_type == 'LikeYourAnswerCommentNotification':
        return data['recent_liker']['profile_image']
    elif notification_type == 'FollowYouNotification':
        return data['recent_follower']['profile_image']
    elif notification_type == 'CustomNotification':
        return data['image']
    else:
        return ''

def get_url(data):
    notification_type = data['type']
    if notification_type == 'NewAnswerOnQuestionNotification':
        return '/question/%d' % data['question']['id']
    elif notification_type == 'FollowYourQuestionNotification':
        return '/question/%d' % data['question']['id']
    elif notification_type == 'NewCommentOnYourQuestionNotification':
        return '/question/%d' % data['question']['id']
    elif notification_type == 'LikeYourAnswerNotification':
        return '/answer/%d' % data['answer']['id']
    elif notification_type == 'NewCommentOnYourAnswerNotification':
        return '/answer/%d' % data['answer']['id']
    elif notification_type == 'LikeYourQuestionCommentNotification':
        return '/question/%d' % data['question']['id']
    elif notification_type == 'LikeYourAnswerCommentNotification':
        return '/answer/%d' % data['answer']['id']
    elif notification_type == 'FollowYouNotification':
        return '/user/%d' % data['recent_follower']['id']
    elif notification_type == 'CustomNotification':
        return data['destination_path']
    else:
        return '/'
