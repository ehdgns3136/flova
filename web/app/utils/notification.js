import React from 'react';
import styled from 'styled-components';


const BoldText = styled.span`
  font-weight: 600;
`;

const BlueText = styled.span`
  font-weight: 500;
  color: ${(props) => props.theme.linkColor};
`;


export function getUrl(notification) {
  switch (notification.get('type')) {
    case 'NewAnswerOnQuestionNotification':
      return `/question/${notification.get('question').get('id')}`;
    case 'FollowYourQuestionNotification':
      return `/question/${notification.get('question').get('id')}`;
    case 'NewCommentOnYourQuestionNotification':
      return `/question/${notification.get('question').get('id')}`;
    case 'LikeYourAnswerNotification':
      return `/answer/${notification.get('answer').get('id')}`;
    case 'NewCommentOnYourAnswerNotification':
      return `/answer/${notification.get('answer').get('id')}`;
    case 'LikeYourQuestionCommentNotification':
      return `/question/${notification.get('question').get('id')}`;
    case 'LikeYourAnswerCommentNotification':
      return `/answer/${notification.get('answer').get('id')}`;
    case 'FollowYouNotification':
      return `/user/${notification.get('recent_follower').get('id')}`;
    case 'CustomNotification':
      return notification.get('destination_path');
    default:
      return '';
  }
}

export function getDescription(notification) {
  switch (notification.get('type')) {
    case 'NewAnswerOnQuestionNotification': {
      const writerName = notification.get('recent_writer').get('name');
      const writerCount = notification.get('writer_count');
      const questionTitle = notification.get('question').get('title');
      const slicedQuestionTitle = (questionTitle.length > 20) ? `${questionTitle.slice(0, 20)}...` : questionTitle;

      return (
        <span>
          <BoldText>{writerName}</BoldText>
          {
            (writerCount > 1) ? `님 외 ${writerCount - 1}명이 질문 ` : '님이 질문 '
          }
          <BlueText>{slicedQuestionTitle}</BlueText>
            에 답변을 달았습니다.
        </span>
      );
    }
    case 'FollowYourQuestionNotification': {
      const followerName = notification.get('recent_follower').get('name');
      const followerCount = notification.get('follower_count');
      const questionTitle = notification.get('question').get('title');
      const slicedQuestionTitle = (questionTitle.length > 20) ? `${questionTitle.slice(0, 20)}...` : questionTitle;

      return (
        <span>
          <BoldText>{followerName}</BoldText>
          {
            (followerCount > 1) ? `님 외 ${followerCount - 1}명이 질문 ` : '님이 질문 '
          }
          <BlueText>{slicedQuestionTitle}</BlueText>
            을 팔로우했습니다.
        </span>
      );
    }
    case 'NewCommentOnYourQuestionNotification': {
      const writerName = notification.get('recent_writer').get('name');
      const writerCount = notification.get('writer_count');
      const questionTitle = notification.get('question').get('title');
      const slicedQuestionTitle = (questionTitle.length > 20) ? `${questionTitle.slice(0, 20)}...` : questionTitle;

      return (
        <span>
          <BoldText>{writerName}</BoldText>
          {
            (writerCount > 1) ? `님 외 ${writerCount - 1}명이 회원님의 질문 ` : '님이 회원님의 질문 '
          }
          <BlueText>{slicedQuestionTitle}</BlueText>
            에 댓글을 남겼습니다.
        </span>
      );
    }
    case 'LikeYourAnswerNotification': {
      const likerName = notification.get('recent_liker').get('name');
      const likerCount = notification.get('liker_count');
      const questionTitle = notification.get('question').get('title');
      const slicedQuestionTitle = (questionTitle.length > 20) ? `${questionTitle.slice(0, 20)}...` : questionTitle;

      return (
        <span>
          <BoldText>{likerName}</BoldText>
          {
            (likerCount > 1) ? `님 외 ${likerCount - 1}명이 ` : '님이 '
          }
          <BlueText>{slicedQuestionTitle}</BlueText>
            에 대한 회원님의 답변을 좋아합니다.
        </span>
      );
    }
    case 'NewCommentOnYourAnswerNotification': {
      const writerName = notification.get('recent_writer').get('name');
      const writerCount = notification.get('writer_count');
      const questionTitle = notification.get('question').get('title');
      const slicedQuestionTitle = (questionTitle.length > 20) ? `${questionTitle.slice(0, 20)}...` : questionTitle;

      return (
        <span>
            <BoldText>{writerName}</BoldText>
          {
            (writerCount > 1) ? `님 외 ${writerCount - 1}명이 ` : '님이 '
          }
          <BlueText>{slicedQuestionTitle}</BlueText>
            에 대한 회원님의 답변에 댓글을 남겼습니다.
          </span>
      );
    }
    case 'LikeYourQuestionCommentNotification': {
      const likerName = notification.get('recent_liker').get('name');
      const likerCount = notification.get('liker_count');
      const commentContent = notification.get('comment_content');
      const slicedCommentContent = (commentContent.length > 20) ? `${commentContent.slice(0, 20)}...` : commentContent;

      return (
        <span>
          <BoldText>{likerName}</BoldText>
          {
            (likerCount > 1) ? `님 외 ${likerCount - 1}명이 ` : '님이 '
          }
          {
            `회원님의 댓글을 좋아합니다: "${slicedCommentContent}"`
          }
        </span>
      );
    }
    case 'LikeYourAnswerCommentNotification': {
      const likerName = notification.get('recent_liker').get('name');
      const likerCount = notification.get('liker_count');
      const commentContent = notification.get('comment_content');
      const slicedCommentContent = (commentContent.length > 20) ? `${commentContent.slice(0, 20)}...` : commentContent;

      return (
        <span>
          <BoldText>{likerName}</BoldText>
          {
            (likerCount > 1) ? `님 외 ${likerCount - 1}명이 ` : '님이 '
          }
          {
            `회원님의 댓글을 좋아합니다: "${slicedCommentContent}"`
          }
        </span>
      );
    }
    case 'FollowYouNotification': {
      const followerName = notification.get('recent_follower').get('name');
      const followerCount = notification.get('follower_count');

      return (
        <span>
          <BoldText>{followerName}</BoldText>
          {
            (followerCount > 1) ? `님 외 ${followerCount - 1}명이 ` : '님이 '
          }
          {
            '회원님을 팔로우합니다.'
          }
        </span>
      );
    }
    case 'CustomNotification': {
      return (
        <span>
          {notification.get('text')}
        </span>
      );
    }
    default:
      return '';
  }
}

export function getProfileImage(notification) {
  switch (notification.get('type')) {
    case 'NewAnswerOnQuestionNotification':
      return notification.get('recent_writer').get('profile_image');
    case 'FollowYourQuestionNotification':
      return notification.get('recent_follower').get('profile_image');
    case 'NewCommentOnYourQuestionNotification':
      return notification.get('recent_writer').get('profile_image');
    case 'LikeYourAnswerNotification':
      return notification.get('recent_liker').get('profile_image');
    case 'NewCommentOnYourAnswerNotification':
      return notification.get('recent_writer').get('profile_image');
    case 'LikeYourQuestionCommentNotification':
      return notification.get('recent_liker').get('profile_image');
    case 'LikeYourAnswerCommentNotification':
      return notification.get('recent_liker').get('profile_image');
    case 'FollowYouNotification':
      return notification.get('recent_follower').get('profile_image');
    case 'CustomNotification':
      return notification.get('image');
    default:
      return '';
  }
}
