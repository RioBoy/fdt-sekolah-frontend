import { Component } from 'react';
import * as _ from 'lodash';
import Wrap from '../../component/layout/Wrap';
import { siswaParam } from './param/siswa.param';
import { eventChange } from '../../helper/actionEvent.helper';
import { apiSiswaCRUD } from '../../service/siswa.api';
import { withNavigation } from '../../component/layout/Navigation.hoc';
import siswaPath from '../../path/siswa.path';
import HomeForm from './component/HomeForm';

class HomeEditPage extends Component {
  state = {
    isLoading: false,
    isLoadingEdit: false,
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
    this.setState({ isLoadingEdit: true });

    apiSiswaCRUD
      .update(this.props?.params?.id, {
        ...this.state.formRequest,
      })
      .then((resData) => {
        this.setState({ isLoadingEdit: true });
        this.props.navigate(siswaPath.main);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  _getData = () => {
    this.setState({ isLoading: true });

    apiSiswaCRUD
      .detail(this.props?.params?.id)
      .then((resData) => {
        this.setState({ isLoading: false });

        if (!_.isEmpty(resData.data)) {
          this.setState({
            formRequest: {
              name_siswa: resData.data?.name_siswa || '',
              nisn_siswa: resData.data?.nisn_siswa || '',
              jenis_kelamin: resData.data?.jenis_kelamin || '',
              tempat_lahir: resData.data?.tempat_lahir || '',
              tanggal_lahir: resData.data?.tanggal_lahir || '',
              agama: resData.data?.agama || '',
              nomor_induk_kependudukan:
                resData.data?.nomor_induk_kependudukan || '',
              nomor_induk_sekolah: resData.data?.nomor_induk_sekolah || '',
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this._getData();
  }

  render() {
    const { formRequest, isLoadingEdit, isLoading } = this.state;

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
          isEdit
          formRequest={formRequest}
          isLoading={isLoadingEdit}
          isLoadingData={isLoading}
          actions={{ change: this._handleChange, submit: this._handleSubmit }}
        />
      </Wrap>
    );
  }
}

export default withNavigation(HomeEditPage);
