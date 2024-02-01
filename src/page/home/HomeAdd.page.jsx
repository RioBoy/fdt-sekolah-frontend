import { Component } from 'react';
import { Link } from 'react-router-dom';
import Wrap from '../../component/layout/Wrap';
import Card from '../../component/card/Card';
import RowForm from '../../component/form/RowForm';
import FormInput from '../../component/form/FormInput';
import { siswaParam } from './param/siswa.param';
import { eventChange } from '../../helper/actionEvent.helper';
import FormRadioButton from '../../component/form/FormRadioButton';
import FormSelectOption from '../../component/form/FormSelectOption';
import siswaPath from '../../path/siswa.path';

const genderOption = [
  { label: 'Pria', value: 'pria' },
  { label: 'Wanita', value: 'wanita' },
];

const religionOption = [
  { label: 'Islam', value: 'islam' },
  { label: 'Kristen', value: 'kristen' },
  { label: 'Katolik', value: 'katolik' },
  { label: 'Hindu', value: 'hindu' },
  { label: 'Buddha', value: 'buddha' },
  { label: 'Konghucu', value: 'konghucu' },
];

class HomeAddPage extends Component {
  state = {
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
    console.log('ok');
  };

  render() {
    const { formRequest } = this.state;

    return (
      <Wrap>
        <div className="flex justify-end">
          <Link to={siswaPath.main} className="btn btn-secondary mb-6">
            Back
          </Link>
        </div>

        <form onSubmit={this._handleSubmit}>
          <Card title="Form Add Siswa">
            <div className="w-full">
              <RowForm label="Siswa Name" isRequired>
                <FormInput
                  name="name_siswa"
                  value={formRequest.name_siswa}
                  required
                  actions={{ onChange: this._handleChange }}
                />
              </RowForm>

              <RowForm label="Siswa NISN" isRequired>
                <FormInput
                  name="nisn_siswa"
                  type="number"
                  value={formRequest.nisn_siswa}
                  required
                  actions={{ onChange: this._handleChange }}
                />
              </RowForm>

              <RowForm label="Gender" isRequired>
                <div className="flex gap-x-6">
                  {genderOption.map((vm, i) => (
                    <div key={i}>
                      <FormRadioButton
                        label={vm.label}
                        name="jenis_kelamin"
                        value={formRequest.jenis_kelamin}
                        defaultValue={vm.value}
                        required
                        actions={{ onChange: this._handleChange }}
                      />
                    </div>
                  ))}
                </div>
              </RowForm>

              <RowForm label="Place of Birth" isRequired>
                <FormInput
                  name="tempat_lahir"
                  value={formRequest.tempat_lahir}
                  required
                  actions={{ onChange: this._handleChange }}
                />
              </RowForm>

              <RowForm label="Date of Birth" isRequired>
                <FormInput
                  name="tanggal_lahir"
                  type="date"
                  value={formRequest.tanggal_lahir}
                  required
                  actions={{ onChange: this._handleChange }}
                />
              </RowForm>

              <RowForm label="Religion" isRequired>
                <FormSelectOption
                  name="agama"
                  value={formRequest.agama}
                  actions={{ onChange: this._handleChange }}
                >
                  <option defaultValue value="">
                    --- Select ---
                  </option>
                  {religionOption.map((vm, i) => (
                    <option value={vm.value} key={i}>
                      {vm.label}
                    </option>
                  ))}
                </FormSelectOption>
              </RowForm>

              <RowForm label="NIK" isRequired>
                <FormInput
                  name="nomor_induk_kependudukan"
                  type="number"
                  value={formRequest.nomor_induk_kependudukan}
                  required
                  actions={{ onChange: this._handleChange }}
                />
              </RowForm>

              <RowForm label="NIS" isRequired>
                <FormInput
                  name="nomor_induk_sekolah"
                  type="number"
                  value={formRequest.nomor_induk_sekolah}
                  required
                  actions={{ onChange: this._handleChange }}
                />
              </RowForm>
            </div>

            <div className="w-full text-right">
              <Link
                to={siswaPath.main}
                className="btn btn-outline btn-primary mr-4"
              >
                Cancel
              </Link>

              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </div>
          </Card>
        </form>
      </Wrap>
    );
  }
}

export default HomeAddPage;
