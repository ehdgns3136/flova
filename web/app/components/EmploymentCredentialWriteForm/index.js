/**
 * Created by donghoon on 17. 8. 9.
 */
import React from 'react';
import PropTypes from 'prop-types';

import { Divider } from 'semantic-ui-react';
import CompanyOption from './CompanyOption';
import CompanyValue from './CompanyValue';
import * as Style from './index.style';
import DEFAULT_IMAGE from '../../assets/topic_image.png';

class EmploymentCredentialWriteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: null,
      companyValidation: true,
      role: null,
      working: false,
      companyOptions: [],
      roleOptions: [],
      whichFieldChanging: '',
    };
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleWorkingChange = this.handleWorkingChange.bind(this);

    this.handleCompanySearchChange = this.handleCompanySearchChange.bind(this);
    this.handleRoleSearchChange = this.handleRoleSearchChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.credential) {
      const credential = this.props.credential;
      const image = (credential.get('company_image')) ? credential.get('company_image') : DEFAULT_IMAGE;

      const companyOptions = [{
        key: credential.get('company_id'),
        value: credential.get('company_id'),
        label: credential.get('company'),
        image,
      }];
      const roleOptions = [{
        key: credential.get('role_id'),
        value: credential.get('role_id'),
        label: credential.get('role'),
      }];

      this.setState({
        company: {
          key: credential.get('company_id'),
          value: credential.get('company_id'),
          label: credential.get('company'),
          image,
        },
        companyOptions,
        role: (credential.get('role')) ? ({
          key: credential.get('role_id'),
          value: credential.get('role_id'),
          label: credential.get('role'),
        }) : (null),
        roleOptions,
        working: credential.get('working'),
      });
    }
  }


  componentWillReceiveProps(nextProps) {
    if (this.state.whichFieldChanging === 'company') {
      let companyOptions = nextProps.topicList.map((topic) => {
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

      if (companyOptions.size === 0) {
        companyOptions = [];
      } else {
        companyOptions = companyOptions.toJS();
      }
      this.setState({
        companyOptions,
      });

      if (this.state.company && companyOptions.length !== 0) {
        if ('new' in this.state.company) {
          const index = companyOptions.findIndex((element) => (element.label === this.state.company.label));
          this.setState({
            company: companyOptions[index],
          });
        }
      }
    }

    if (this.state.whichFieldChanging === 'role') {
      let roleOptions = nextProps.roleList.map((role) => {
        const id = role.get('id');
        const title = role.get('title');
        const option = {
          key: id,
          value: id,
          label: title,
        };
        return option;
      });

      if (roleOptions.size === 0) {
        roleOptions = [];
      } else {
        roleOptions = roleOptions.toJS();
      }

      this.setState({
        roleOptions,
      });

      if (this.state.role && roleOptions.length !== 0) {
        if ('new' in this.state.role) {
          const index = roleOptions.findIndex((element) => (element.label === this.state.role.label));
          this.setState({
            role: roleOptions[index],
          });
        }
      }
    }
  }


  handleCompanyChange(e) {
    if (e !== null) {
      if ('new' in e) {
        this.props.onAddTopic(e.value);
      }
    }

    this.setState({
      company: e,
    });
  }
  handleRoleChange(e) {
    if (e !== null) {
      if ('new' in e) {
        this.props.onAddRole(e.value);
      }
    }

    this.setState({
      role: e,
    });
  }
  handleWorkingChange(e) {
    this.setState({
      working: !this.state.working,
    });
  }

  handleCompanySearchChange(value) {
    this.props.onGetTopicSearch(value);
    this.setState({
      whichFieldChanging: 'company',
    });
    return value;
  }
  handleRoleSearchChange(value) {
    this.props.onGetRoleSearch(value);
    this.setState({
      whichFieldChanging: 'role',
    });
    return value;
  }

  handleSubmit(event) {
    if (this.state.company) {
      this.props.onPostCredential(this.state, 'employment');
      this.props.onClickCancel();
    }
    this.setState({
      companyValidation: false,
    });
  }

  companyPromptTextCreator(label) {
    return `회사 추가: ${label}`;
  }

  rolePromptTextCreator(label) {
    return `직위 추가: ${label}`;
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
          <Style.FieldLabel>회사</Style.FieldLabel>
          <Style.FieldSelectCreatable
            placeholder=""
            noResultsText="검색결과가 없습니다."
            promptTextCreator={this.companyPromptTextCreator}
            value={this.state.company}
            valueComponent={CompanyValue}
            options={this.state.companyOptions}
            optionComponent={CompanyOption}
            onInputChange={this.handleCompanySearchChange}
            onChange={this.handleCompanyChange}
            newOptionCreator={this.newOptionCreator}
          />
        </Style.FieldWrapper>
        <Style.ErrorMessage hidden={this.state.companyValidation}>직장을 입력해주세요.</Style.ErrorMessage>
        <Style.FieldWrapper marginLeft="70px">
          <Style.FieldLabel>직위</Style.FieldLabel>
          <Style.FieldSelectCreatable
            placeholder=""
            noResultsText="검색결과가 없습니다."
            promptTextCreator={this.rolePromptTextCreator}
            value={this.state.role}
            options={this.state.roleOptions}
            onInputChange={this.handleRoleSearchChange}
            onChange={this.handleRoleChange}
            newOptionCreator={this.newOptionCreator}
          />
        </Style.FieldWrapper>
        <Style.FieldWrapper marginLeft="58px">
          <Style.FieldLabel>근무중</Style.FieldLabel>
          <Style.CustomCheckbox onClick={this.handleWorkingChange} checked={this.state.working} />
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

EmploymentCredentialWriteForm.propTypes = {
  onClickCancel: PropTypes.func.isRequired,
  onGetTopicSearch: PropTypes.func.isRequired,
  onGetRoleSearch: PropTypes.func.isRequired,
  onAddTopic: PropTypes.func.isRequired,
  onAddRole: PropTypes.func.isRequired,
  onPostCredential: PropTypes.func.isRequired,
  credential: PropTypes.object,
};

export default EmploymentCredentialWriteForm;

