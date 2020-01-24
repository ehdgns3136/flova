import {
  // fromJS,
  is,
} from 'immutable';
import homePageReducer from '../reducer';
import {
  getActivitiesSuccess,
  changeActiveCategory,
} from '../actions';

describe('homePageReducer', () => {
  it('should return the initial state', () => {
    expect(homePageReducer(undefined, {})).toMatchSnapshot();
  });

  it('should get activites correctly', () => {
    const state = homePageReducer(undefined, getActivitiesSuccess([
      {
        "activity_data": {
          "id": 62,
          "created": "2017-11-24T03:08:44.568349Z",
          "content_class": "Answer",
          "type": "answer_liked_by_following_user",
          "following_users": [
            {
              "id": 3,
              "name": "장난",
              "description": "",
              "profile_image": "",
              "answer_num": 0,
              "answer_likes": 0,
              "follower_num": 1,
              "string_credentials": [],
              "is_following": true,
            }
          ]
        },
        "content": {
          "question": {
            "id": 4,
            "writer": {
              "id": 1,
              "name": "김찬욱",
              "description": "서울대학교 컴퓨터공학부 학사 재학중",
              "profile_image": "",
              "answer_num": 3,
              "answer_likes": 4,
              "follower_num": 2,
              "string_credentials": [
                {
                  "id": 1,
                  "to_string": "서울대학교 컴퓨터공학부 학사 재학중",
                  "type": "education"
                },
                {
                  "id": 2,
                  "to_string": "Flova 운영진 재직중",
                  "type": "employment"
                }
              ],
              "is_following": null,
            },
            "content": "[{\"key\":\"m79uq7aj\",\"type\":\"unstyled\",\"depth\":0,\"text\":\"\",\"styles\":[],\"entities\":[]}]",
            "created": "2017-11-20T05:21:26.080987Z",
            "modified": "2017-11-21T10:09:54.856203Z",
            "topics": [
              {
                "id": 3,
                "topic_image": "https://s3.ap-northeast-2.amazonaws.com/flova/topics/programming.jpeg",
                "title": "프로그래밍",
                "followed_num": 4,
                "description": "",
                "question_num": 4
              }
            ],
            "followed_num": 1,
            "anonymous": false,
            "title": "질문예시",
            "comment_num": 0,
            "answer_num": 2,
            "comments": [],
            "is_mine": true,
            "is_followed": true,
            "is_answered": true,
            "my_answer": {
              "id": 1,
              "content": "[{\"key\":\"6j3lg9aj\",\"type\":\"unstyled\",\"depth\":0,\"text\":\"너무행너무행\",\"styles\":[],\"entities\":[]}]"
            }
          },
          "answer": {
            "id": 2,
            "liked_num": 0,
            "content": "[{\"key\":\"2h2fiaaj\",\"type\":\"unstyled\",\"depth\":0,\"text\":\"답변을 달았어요!\",\"styles\":[],\"entities\":[]}]",
            "question": 4,
            "writer": {
              "id": 2,
              "name": "서희수",
              "description": "",
              "profile_image": "",
              "answer_num": 2,
              "answer_likes": 1,
              "follower_num": 1,
              "string_credentials": [],
              "is_following": true,
            },
            "created": "2017-11-22T03:49:05.121310Z",
            "modified": "2017-11-22T03:49:05.121366Z",
            "comment_num": 0,
            "comments": [],
            "is_mine": false,
            "is_liked": false,
            "is_downvoted": false
          },
        },
      },
    ], 'http://localhost:8000/feed/main/?cursor=cD0yMDE3LTExLTIyKzA2JTNBMDglM0EzMC40MjgxOTElMkIwMCUzQTAw', null));

    expect(state).toMatchSnapshot();
  });

  it('should get questions correctly', () => {
    const state = homePageReducer(undefined, getActivitiesSuccess([{
      "content": {
        "question": {
          "id": 8,
          "writer": {
            "id": 1,
            "name": "김찬욱",
            "description": "서울대학교 컴퓨터공학부 학사 재학중",
            "profile_image": "",
            "answer_num": 3,
            "answer_likes": 4,
            "follower_num": 2,
            "string_credentials": [
              {
                "id": 1,
                "to_string": "서울대학교 컴퓨터공학부 학사 재학중",
                "type": "education"
              },
              {
                "id": 2,
                "to_string": "Flova 운영진 재직중",
                "type": "employment"
              }
            ],
            "is_following": null,
          },
          "content": "[{\"key\":\"ivhkoaaj\",\"type\":\"unstyled\",\"depth\":0,\"text\":\"\",\"styles\":[],\"entities\":[]}]",
          "created": "2017-11-22T06:41:10.041264Z",
          "modified": "2017-11-22T06:41:10.041303Z",
          "topics": [
            {
              "id": 3,
              "topic_image": "https://s3.ap-northeast-2.amazonaws.com/flova/topics/programming.jpeg",
              "title": "프로그래밍",
              "followed_num": 4,
              "description": "",
              "question_num": 4
            },
            {
              "id": 7,
              "topic_image": "https://s3.ap-northeast-2.amazonaws.com/flova/topics/movie.jpeg",
              "title": "영화",
              "followed_num": 4,
              "description": "",
              "question_num": 1
            }
          ],
          "followed_num": 0,
          "anonymous": false,
          "title": "프로그래밍과 영화",
          "comment_num": 0,
          "answer_num": 1,
          "comments": [],
          "is_mine": true,
          "is_followed": false,
          "is_answered": true,
          "my_answer": {
            "id": 6,
            "content": "[{\"key\":\"ew18paaj\",\"type\":\"unstyled\",\"depth\":0,\"text\":\"새롭게 답변을 달자\",\"styles\":[],\"entities\":[]}]"
          }
        },
        "answer": {
          "id": 6,
          "liked_num": 0,
          "content": "[{\"key\":\"ew18paaj\",\"type\":\"unstyled\",\"depth\":0,\"text\":\"새롭게 답변을 달자\",\"styles\":[],\"entities\":[]}]",
          "question": 8,
          "writer": {
            "id": 1,
            "name": "김찬욱",
            "description": "서울대학교 컴퓨터공학부 학사 재학중",
            "profile_image": "",
            "answer_num": 3,
            "answer_likes": 4,
            "follower_num": 2,
            "string_credentials": [
              {
                "id": 1,
                "to_string": "서울대학교 컴퓨터공학부 학사 재학중",
                "type": "education"
              },
              {
                "id": 2,
                "to_string": "Flova 운영진 재직중",
                "type": "employment"
              }
            ],
            "is_following": null,
          },
          "created": "2017-11-22T06:59:36.827109Z",
          "modified": "2017-11-22T06:59:36.827153Z",
          "comment_num": 0,
          "comments": [],
          "is_mine": true,
          "is_liked": false,
          "is_downvoted": false
        }
      }
    },
    {
      "content": {
        "question": {
          "id": 7,
          "writer": {
            "id": 1,
            "name": "김찬욱",
            "description": "서울대학교 컴퓨터공학부 학사 재학중",
            "profile_image": "",
            "answer_num": 3,
            "answer_likes": 4,
            "follower_num": 2,
            "string_credentials": [
              {
                "id": 1,
                "to_string": "서울대학교 컴퓨터공학부 학사 재학중",
                "type": "education"
              },
              {
                "id": 2,
                "to_string": "Flova 운영진 재직중",
                "type": "employment"
              }
            ],
            "is_following": null,
          },
          "content": "[{\"key\":\"965ioaaj\",\"type\":\"unstyled\",\"depth\":0,\"text\":\"\",\"styles\":[],\"entities\":[]}]",
          "created": "2017-11-22T06:39:20.321756Z",
          "modified": "2017-11-24T02:38:13.280526Z",
          "topics": [
            {
              "id": 3,
              "topic_image": "https://s3.ap-northeast-2.amazonaws.com/flova/topics/programming.jpeg",
              "title": "프로그래밍",
              "followed_num": 4,
              "description": "",
              "question_num": 4
            }
          ],
          "followed_num": 1,
          "anonymous": false,
          "title": "프로그래밍 ㅅㅂ",
          "comment_num": 0,
          "answer_num": 0,
          "comments": [],
          "is_mine": true,
          "is_followed": true,
          "is_answered": false
        },
        "answer": null
      }
    },], null, null));

    expect(state).toMatchSnapshot();
  });

  it('should change active category correctly', () => {
    let state = homePageReducer(undefined, {
      type: '_INITIALIZE',
    });

    state = homePageReducer(state, changeActiveCategory('topic/3'));

    expect(state).toMatchSnapshot();

    state = homePageReducer(undefined, getActivitiesSuccess([{
      "content": {
        "question": {
          "id": 8,
          "writer": {
            "id": 1,
            "name": "김찬욱",
            "description": "서울대학교 컴퓨터공학부 학사 재학중",
            "profile_image": "",
            "answer_num": 3,
            "answer_likes": 4,
            "follower_num": 2,
            "string_credentials": [
              {
                "id": 1,
                "to_string": "서울대학교 컴퓨터공학부 학사 재학중",
                "type": "education"
              },
              {
                "id": 2,
                "to_string": "Flova 운영진 재직중",
                "type": "employment"
              }
            ],
            "is_following": null,
          },
          "content": "[{\"key\":\"ivhkoaaj\",\"type\":\"unstyled\",\"depth\":0,\"text\":\"\",\"styles\":[],\"entities\":[]}]",
          "created": "2017-11-22T06:41:10.041264Z",
          "modified": "2017-11-22T06:41:10.041303Z",
          "topics": [
            {
              "id": 3,
              "topic_image": "https://s3.ap-northeast-2.amazonaws.com/flova/topics/programming.jpeg",
              "title": "프로그래밍",
              "followed_num": 4,
              "description": "",
              "question_num": 4
            },
            {
              "id": 7,
              "topic_image": "https://s3.ap-northeast-2.amazonaws.com/flova/topics/movie.jpeg",
              "title": "영화",
              "followed_num": 4,
              "description": "",
              "question_num": 1
            }
          ],
          "followed_num": 0,
          "anonymous": false,
          "title": "프로그래밍과 영화",
          "comment_num": 0,
          "answer_num": 1,
          "comments": [],
          "is_mine": true,
          "is_followed": false,
          "is_answered": true,
          "my_answer": {
            "id": 6,
            "content": "[{\"key\":\"ew18paaj\",\"type\":\"unstyled\",\"depth\":0,\"text\":\"새롭게 답변을 달자\",\"styles\":[],\"entities\":[]}]"
          }
        },
        "answer": {
          "id": 6,
          "liked_num": 0,
          "content": "[{\"key\":\"ew18paaj\",\"type\":\"unstyled\",\"depth\":0,\"text\":\"새롭게 답변을 달자\",\"styles\":[],\"entities\":[]}]",
          "question": 8,
          "writer": {
            "id": 1,
            "name": "김찬욱",
            "description": "서울대학교 컴퓨터공학부 학사 재학중",
            "profile_image": "",
            "answer_num": 3,
            "answer_likes": 4,
            "follower_num": 2,
            "string_credentials": [
              {
                "id": 1,
                "to_string": "서울대학교 컴퓨터공학부 학사 재학중",
                "type": "education"
              },
              {
                "id": 2,
                "to_string": "Flova 운영진 재직중",
                "type": "employment"
              }
            ],
            "is_following": null,
          },
          "created": "2017-11-22T06:59:36.827109Z",
          "modified": "2017-11-22T06:59:36.827153Z",
          "comment_num": 0,
          "comments": [],
          "is_mine": true,
          "is_liked": false,
          "is_downvoted": false
        }
      }
    },], null, null));
    state = homePageReducer(state, changeActiveCategory('home'));

    expect(is(state, homePageReducer(undefined, {
      type: '_INITIALIZE',
    }))).toBe(true);
  });
});
