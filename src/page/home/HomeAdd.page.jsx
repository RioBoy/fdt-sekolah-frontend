import { Component } from 'react';
import * as _ from 'lodash';
import Wrap from '../../component/layout/Wrap';
import { siswaParam } from './param/siswa.param';
import { eventChange } from '../../helper/actionEvent.helper';
import siswaPath from '../../path/siswa.path';
import { apiSiswaCRUD } from '../../service/siswa.api';
import { withNavigation } from '../../component/layout/Navigation.hoc';
import HomeForm from './component/HomeForm';

class HomeAddPage extends Component {
  state = {
    isLoading: false,
    formRequest: {
      ...siswaParam,
    },
  };

  _handleChange = (e) => {
    const { name, value } = eventChange(e);

    this.setState((prevState) => {
      let newFormRequest = { ...prevState.formRequest };
      newFormRequest[name] = value;

      return {
        formRequest: newFormRequest,
      };
    });
  };

  _handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });

    apiSiswaCRUD
      .add({ ...this.state.formRequest })
      .then((resData) => {
        this.setState({ isLoading: false });

        if (!_.isEmpty(resData?.data)) {
          this.props.navigate(siswaPath.main);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { formRequest, isLoading } = this.state;

    return (
      <Wrap>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              this.props.navigate(siswaPath.main);
            }}
            className="btn btn-secondary mb-6"
          >
            Back
          </button>
        </div>

        <HomeForm
          formRequest={formRequest}
          isLoading={isLoading}
          actions={{ change: this._handleChange, submit: this._handleSubmit }}
        />
      </Wrap>
    );
  }
}

export default withNavigation(HomeAddPage);
