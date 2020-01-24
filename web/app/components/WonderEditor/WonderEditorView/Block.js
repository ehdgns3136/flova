import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import * as Style from './Block.style';
import {
  getNodeTree,
  restoreDOMNodeFromNodeTree,
} from '../utils/dom-utils';
import {
  splitBlockToSegments,
} from '../utils/render-utils';


class Block extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.nodeTree = {};
  }

  componentDidMount() {
    // console.log('block componentDidMount called! blockKey: ', this.props.block.get('key'));

    this.nodeTree = getNodeTree(ReactDOM.findDOMNode(this));
    // console.log('nodeTrees', this.nodeTrees);
  }

  componentWillUpdate(nextProps, nextState) {
    // console.log('block componentWillUpdate called! blockKey: ', this.props.block.get('key'));

    // restore dom nodes (which is changed by contenteditable) before react's update.
    restoreDOMNodeFromNodeTree(this.nodeTree);

    // console.log('DOM restored!');
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('block componentDidUpdate called! blockKey: ', this.props.block.get('key'));

    this.nodeTree = getNodeTree(ReactDOM.findDOMNode(this));
    // console.log('nodeTrees', this.nodeTrees);
  }

  getRichStyle(styles) {
    const richStyle = {};

    styles.forEach((style) => {
      switch (style) {
        case 'bold':
          richStyle.fontWeight = 'bold';
          break;
        case 'underline':
          richStyle.textDecoration = (richStyle.textDecoration) ? `${richStyle.textDecoration} underline` : 'underline';
          break;
        case 'strikethrough':
          richStyle.textDecoration = (richStyle.textDecoration) ? `${richStyle.textDecoration} line-through` : 'line-through';
          break;
        default:
          break;
      }
    });

    return richStyle;
  }

  renderBlock(blockData) {
    if (blockData.get('type') === 'image' && blockData.get('data') && blockData.get('data').get('src')) {
      return (
        <span data-offset={0} data-length={1} data-editor-key="wondereditor" data-is-segment={true}>
          <Style.Image src={blockData.get('data').get('src')} onClick={(this.props.readOnly) ? () => null : () => { this.props.handleImageClick(blockData.get('key')); }} />
        </span>
      );
    }

    const text = blockData.get('text');

    if (!text) {
      const richStyle = this.getRichStyle(blockData.get('styles').map((blockStyle) => blockStyle.get('type')));

      return (
        <span data-offset={0} data-length={0} style={richStyle} data-editor-key="wondereditor" data-is-segment={true}>
          <span data-is-text={true} dangerouslySetInnerHTML={{__html: '&#8203;'}} />
          <br data-is-text={true} />
        </span>
      );
    }

    const segments = splitBlockToSegments(blockData.get('styles'), blockData.get('entities'), text.length, this.props.styleChanges, this.props.selectionInfoOnStyleChange);

    const segmentElements = segments.map((segment, index) => {
      const segmentText = text.slice(segment.start, segment.end + 1);
      const richStyle = this.getRichStyle(segment.styles);

      if (segment.changeSegment === true) {
        return (
          <span
            key={`${segment.start}-${segmentText.length}`}
            data-offset={segment.start}
            data-length={segmentText.length}
            style={richStyle}
            data-editor-key="wondereditor"
            data-is-segment={true}
            data-is-change-segment={true}
            data-style-change-remove={JSON.stringify(segment.styleChangeRemove)}
            data-style-change-add={JSON.stringify(segment.styleChangeAdd)}
          >
            <span data-is-text={true} dangerouslySetInnerHTML={{__html: '&#8203;'}} />
          </span>
        );
      } else {
        return (
          <span key={`${segment.start}-${segmentText.length}`} data-offset={segment.start} data-length={segmentText.length} style={richStyle} data-editor-key="wondereditor" data-is-segment={true}>
            <span data-is-text={true}>
              {segmentText}
            </span>
          </span>
        );
      }
    });

    if (blockData.get('entities')) {
      blockData.get('entities').forEach((entity) => {
        if (entity.get('type') === 'link') {
          let startIndex = 0;
          let endIndex = 0;
          for (let i = 0; i < segmentElements.length; i += 1) {
            if (segmentElements[i].props['data-offset'] === entity.get('start')) {
              startIndex = i;
            }

            if (segmentElements[i].props['data-offset'] + segmentElements[i].props['data-length'] === entity.get('start') + entity.get('length')) {
              endIndex = i;
            }
          }

          const slicedSegments = segmentElements.slice(startIndex, endIndex + 1);
          const wrappedSegment = React.createElement(
            Style.StyledA,
            {
              key: `${entity.get('start')}-${entity.get('length')}`,
              href: entity.get('data').get('url'),
              target: '_blank',
            },
            ...slicedSegments,
          );

          segmentElements.splice(startIndex, endIndex - startIndex + 1, wrappedSegment);
        }
      });
    }

    if (this.props.block.get('isTrimmed')) {
      const handleShowMoreClick = () => {
        if (this.props.readOnly && typeof this.props.onShowMore === 'function') {
          this.props.onShowMore();
        }
      };
      segmentElements.push(
        <span key="show-more">
          <Style.ShowMore onClick={handleShowMoreClick}>(더 보기)</Style.ShowMore>
        </span>
      );
    }

    return segmentElements;
  }

  render() {
    return (
      <Style.BlockContainer
        data-block-key={this.props.block.get('key')}
        data-is-block={true}
        data-offset={0}
        data-type={this.props.block.get('type')}
        data-depth={this.props.block.get('depth')}
        type={this.props.block.get('type')}
        depth={this.props.block.get('depth')}
        count={this.props.block.get('count')}
        codeBlockStart={this.props.block.get('codeBlockStart')}
        codeBlockEnd={this.props.block.get('codeBlockEnd')}
      >
        {
          this.renderBlock(this.props.block)
        }
      </Style.BlockContainer>
    );
  }
}

Block.propTypes = {
  block: PropTypes.instanceOf(Immutable.Map),
  styleChanges: PropTypes.object,
  selectionInfoOnStyleChange: PropTypes.object,
  readOnly: PropTypes.bool,
  onShowMore: PropTypes.func, // if editorstate was trimmed
  handleImageClick: PropTypes.func,
};

export default Block;
