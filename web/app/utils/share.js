import { safelyParseEditorStateString, editorStateToString } from '../components/WonderEditor/utils/editor-state-utils';
import kakaoSampleImage from '../assets/kakao_sample_image.png';
/**
 * Created by donghoon on 17. 10. 17.
 */
export function facebookShare(url) {
  FB.ui({
    method: 'share',
    href: url,
  }, function (response) { });
}

export function kakaoShareQuestion(question) {
  const description = editorStateToString(safelyParseEditorStateString(question.get('content')));

  let imageUrl = kakaoSampleImage;

  question.get('topics').some((topic) => {
    if (topic.get('topic_image') !== '') {
      imageUrl = topic.get('topic_image');
      return true;
    }
    return false;
  });

  const questionUrl = `${URL_ROOT}/question/${question.get('id')}`;

  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: question.get('title'),
      description,
      imageUrl,
      link: {
        mobileWebUrl: questionUrl,
        webUrl: questionUrl,
      },
    },
    social: {
      likeCount: question.get('followed_num'),
      commentCount: question.get('answer_num'),
    },
    buttons: [
      {
        title: '웹으로 보기',
        link: {
          webUrl: questionUrl,
          mobileWebUrl: questionUrl,
        },
      },
    ],
  });
}

export function kakaoShareAnswer(question, answer) {
  const description = `${answer.get('writer').get('name')}님의 답변: ${editorStateToString(safelyParseEditorStateString(answer.get('content')))}`;

  let imageUrl = kakaoSampleImage;

  question.get('topics').some((topic) => {
    if (topic.get('topic_image') !== '') {
      imageUrl = topic.get('topic_image');
      return true;
    }
    return false;
  });

  const answerUrl = `${URL_ROOT}/answer/${answer.get('id')}`;

  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: question.get('title'),
      description,
      imageUrl,
      link: {
        mobileWebUrl: answerUrl,
        webUrl: answerUrl,
      },
    },
    social: {
      likeCount: answer.get('liked_num'),
      commentCount: answer.get('comment_num'),
    },
    buttons: [
      {
        title: '웹으로 보기',
        link: {
          webUrl: answerUrl,
          mobileWebUrl: answerUrl,
        },
      },
    ],
  });
}
