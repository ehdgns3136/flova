/**
*
* EducationCredentialWriteForm
*
*/
/**
 * Created by donghoon on 17. 8. 9.
 */
import React from 'react';
import PropTypes from 'prop-types';

import { Divider } from 'semantic-ui-react';
import SchoolOption from './SchoolOption';
import SchoolValue from './SchoolValue';
import * as Style from './index.style';
import DEFAULT_IMAGE from '../../assets/topic_image.png';

class EducationCredentialWriteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      school: null,
      schoolValidation: true,
      major: null,
      minor: null,
      graduation_year: null,
      degree: '',
      attending: false,
      schoolOptions: [],
      majorOptions: [],
      minorOptions: [],
      yearOptions: [],
      whichFieldChanging: '',
    };
    this.handleSchoolChange = this.handleSchoolChange.bind(this);
    this.handleMajorChange = this.handleMajorChange.bind(this);
    this.handleMinorChange = this.handleMinorChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleDegreeChange = this.handleDegreeChange.bind(this);
    this.handleAttendingChange = this.handleAttendingChange.bind(this);

    this.handleSchoolSearchChange = this.handleSchoolSearchChange.bind(this);
    this.handleMajorSearchChange = this.handleMajorSearchChange.bind(this);
    this.handleMinorSearchChange = this.handleMinorSearchChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const yearOptions = [];
    for (let i = 1920; i <= (new Date()).getFullYear(); i++) {
      yearOptions.push({
        key: i,
        value: i,
        label: i,
      });
    }
    this.setState({
      yearOptions,
    });

    if (this.props.credential) {
      const credential = this.props.credential;
      const image = (credential.get('school_image')) ? credential.get('school_image') : DEFAULT_IMAGE;

      const schoolOptions = [{
        key: credential.get('school_id'),
        value: credential.get('school_id'),
        label: credential.get('school'),
        image,
      }];
      const majorOptions = [{
        key: credential.get('major_id'),
        value: credential.get('major_id'),
        label: credential.get('major'),
      }];

      const minorOptions = [{
        key: credential.get('minor_id'),
        value: credential.get('minor_id'),
        label: credential.get('minor'),
      }];

      this.setState({
        school: {
          key: credential.get('school_id'),
          value: credential.get('school_id'),
          label: credential.get('school'),
          image,
        },
        schoolOptions,
        major: (credential.get('major')) ? ({
          key: credential.get('major_id'),
          value: credential.get('major_id'),
          label: credential.get('major'),
        }) : (null),
        majorOptions,
        minor: (credential.get('minor')) ? ({
          key: credential.get('minor_id'),
          value: credential.get('minor_id'),
          label: credential.get('minor'),
        }) : (null),
        minorOptions,
        graduation_year: (credential.get('graduation_year') !== 0) ? ({
          key: credential.get('graduation_year'),
          value: credential.get('graduation_year'),
          label: credential.get('graduation_year'),
        }) : (null),
        attending: credential.get('attending'),
        degree: credential.get('degree'),
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.whichFieldChanging === 'school') {
      let schoolOptions = nextProps.topicList.map((topic) => {
        const id = topic.get('id');
        const title = topic.get('title');
        const image = topic.get('topic_image') ? topic.get('topic_image') : DEFAULT_IMAGE;
        const option = {
          key: id,
          value: id,
          label: title,
          image,
        };
        return option;
      });

      if (schoolOptions.size === 0) {
        schoolOptions = [];
      } else {
        schoolOptions = schoolOptions.toJS();
      }
      this.setState({
        schoolOptions,
      });

      if (this.state.school && schoolOptions.length !== 0) {
        if ('new' in this.state.school) {
          const index = schoolOptions.findIndex((element) => (element.label === this.state.school.label));
          this.setState({
            school: schoolOptions[index],
          });
        }
      }
    }

    if (this.state.whichFieldChanging === 'major' || this.state.whichFieldChanging === 'minor') {
      let concentrationOptions = nextProps.concentrationList.map((concentration) => {
        const id = concentration.get('id');
        const title = concentration.get('title');
        const option = {
          key: id,
          value: id,
          label: title,
        };
        return option;
      });

      if (concentrationOptions.size === 0) {
        concentrationOptions = [];
      } else {
        concentrationOptions = concentrationOptions.toJS();
      }

      if (this.state.whichFieldChanging === 'major') {
        this.setState({
          majorOptions: concentrationOptions,
        });

        if (this.state.major && concentrationOptions.length !== 0) {
          if ('new' in this.state.major) {
            const index = concentrationOptions.findIndex((element) => (element.label === this.state.major.label));
            this.setState({
              major: concentrationOptions[index],
            });
          }
        }
      } else if (this.state.whichFieldChanging === 'minor') {
        this.setState({
          minorOptions: concentrationOptions,
        });

        if (this.state.minor && concentrationOptions.length !== 0) {
          if ('new' in this.state.minor) {
            const index = concentrationOptions.findIndex((element) => (element.label === this.state.minor.label));
            this.setState({
              minor: concentrationOptions[index],
            });
          }
        }
      }
    }
  }


  handleSchoolChange(e) {
    if (e) {
      if ('new' in e) {
        this.props.onAddTopic(e.value);
      }
    }

    this.setState({
      school: e,
    });
  }
  handleMajorChange(e) {
    if (e) {
      if ('new' in e) {
        this.props.onAddConcentration(e.value);
      }
    }

    this.setState({
      major: e,
    });
  }
  handleMinorChange(e) {
    if (e) {
      if ('new' in e) {
        this.props.onAddConcentration(e.value);
      }
    }

    this.setState({
      minor: e,
    });
  }
  handleYearChange(e) {
    this.setState({
      graduation_year: e,
    });
  }
  handleDegreeChange(e) {
    this.setState({
      degree: e.target.value,
    });
  }
  handleAttendingChange(e) {
    this.setState({
      attending: !this.state.attending,
    });
    if (e.target.checked) {
      this.setState({
        graduation_year: null,
      });
    }
  }

  handleSchoolSearchChange(value) {
    this.props.onGetTopicSearch(value);
    this.setState({
      whichFieldChanging: 'school',
    });
    return value;
  }
  handleMajorSearchChange(value) {
    this.props.onGetConcentrationSearch(value);
    this.setState({
      whichFieldChanging: 'major',
    });
    return value;
  }
  handleMinorSearchChange(value) {
    this.props.onGetConcentrationSearch(value);
    this.setState({
      whichFieldChanging: 'minor',
    });
    return value;
  }

  handleSubmit() {
    if (this.state.school) {
      this.props.onPostCredential(this.state, 'education');
      this.props.onClickCancel();
    }
    this.setState({
      schoolValidation: false,
    });
  }

  schoolPromptTextCreator(label) {
    return `학교 추가: ${label}`;
  }

  concentrationPromptTextCreator(label) {
    return `전공 추가: ${label}`;
  }

  newOptionCreator({ label, labelKey, valueKey }) {
    const option = {};
    option[valueKey] = label;
    option[labelKey] = label;
    option['image'] = DEFAULT_IMAGE;
    option.new = true;
    return option;
  }

  render() {
    return (
      <Style.ListItemWrapper>
        <Style.FieldWrapper>
          <Style.FieldLabel>학교</Style.FieldLabel>
          <Style.FieldSelectCreatable
            placeholder=""
            noResultsText="검색결과가 없습니다."
            promptTextCreator={this.schoolPromptTextCreator}
            value={this.state.school}
            valueComponent={SchoolValue}
            options={this.state.schoolOptions}
            optionComponent={SchoolOption}
            onInputChange={this.handleSchoolSearchChange}
            onChange={this.handleSchoolChange}
            newOptionCreator={this.newOptionCreator}
          />
        </Style.FieldWrapper>
        <Style.ErrorMessage hidden={this.state.schoolValidation}>학교를 입력해주세요.</Style.ErrorMessage>
        <Style.FieldWrapper>
          <Style.FieldLabel>전공</Style.FieldLabel>
          <Style.FieldSelectCreatable
            placeholder=""
            noResultsText="검색결과가 없습니다."
            promptTextCreator={this.concentrationPromptTextCreator}
            value={this.state.major}
            options={this.state.majorOptions}
            onInputChange={this.handleMajorSearchChange}
            onChange={this.handleMajorChange}
            newOptionCreator={this.newOptionCreator}
          />
        </Style.FieldWrapper>
        <Style.FieldWrapper>
          <Style.FieldLabel>복/부전공</Style.FieldLabel>
          <Style.FieldSelectCreatable
            placeholder=""
            noResultsText="검색결과가 없습니다."
            promptTextCreator={this.concentrationPromptTextCreator}
            value={this.state.minor}
            options={this.state.minorOptions}
            onInputChange={this.handleMinorSearchChange}
            onChange={this.handleMinorChange}
            newOptionCreator={this.newOptionCreator}
          />
        </Style.FieldWrapper>
        <Style.FieldWrapper>
          <Style.FieldLabel>학위</Style.FieldLabel>
          <Style.InputWrapper onChange={this.handleDegreeChange} value={this.state.degree} placeholder="학사 / 석사 / 박사" />
        </Style.FieldWrapper>
        <Style.FieldWrapper>
          <Style.FieldLabel>재학중</Style.FieldLabel>
          <Style.CustomCheckbox onClick={this.handleAttendingChange} checked={this.state.attending} />
        </Style.FieldWrapper>
        <Style.FieldWrapper>
          <Style.FieldLabel disabled={this.state.attending}>졸업년도</Style.FieldLabel>
          <Style.FieldSelect
            noResultsText=""
            placeholder=""
            options={this.state.yearOptions}
            value={this.state.graduation_year}
            onChange={this.handleYearChange}
            disabled={this.state.attending}
          />
        </Style.FieldWrapper>
        <Style.Divider />
        <Style.ButtonGroup>
          <Style.SaveButton inverted onClick={this.handleSubmit}>변경내용 저장</Style.SaveButton>
          <Style.CancelButton inverted onClick={this.props.onClickCancel}>취소</Style.CancelButton>
        </Style.ButtonGroup>
      </Style.ListItemWrapper>
    );
  }
}

EducationCredentialWriteForm.propTypes = {
  onClickCancel: PropTypes.func.isRequired,
  onGetTopicSearch: PropTypes.func.isRequired,
  onGetConcentrationSearch: PropTypes.func.isRequired,
  onAddTopic: PropTypes.func.isRequired,
  onAddConcentration: PropTypes.func.isRequired,
  onPostCredential: PropTypes.func.isRequired,
  credential: PropTypes.object,
};

export default EducationCredentialWriteForm;

