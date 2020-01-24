import styled from 'styled-components';

export const RelativeDiv = styled.div`
  position: relative;
  height: 100%;
`;

export const PaddingTopDiv = styled.div`
  padding-top: ${(props) => (props.top + 'px')};
`;

export const Container = styled.div`
  margin: 0 auto;
  max-width: 1100px;
  width: 100%;
  display: flex;
`;

export const FeedCategoriesContainer = styled.div`
  width: 216px;
`;

export const MobileQuestionFormContainer = styled.div`
  width: 600px;
  margin: 0 auto;
`;

export const QuestionListContainer = styled.div`
  width: 600px;
  margin: 0 auto;
  padding-left: 20px;
`;

export const HomeContentRightContainer = styled.div`
  width: 225px;
  margin-left: 30px;
`;

export const MobileActivityListContainer = styled.div`
  width: 100%;
  margin: 0;

  @media (min-width: 640px) {
    max-width: 600px;
    margin: 0 auto;
  }
`;
