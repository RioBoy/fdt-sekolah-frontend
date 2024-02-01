import { useNavigate } from 'react-router-dom';
import Card from '../../../component/card/Card';
import FormInput from '../../../component/form/FormInput';
import FormRadioButton from '../../../component/form/FormRadioButton';
import FormSelectOption from '../../../component/form/FormSelectOption';
import RowForm from '../../../component/form/RowForm';
import siswaPath from '../../../path/siswa.path';
import LoadingNotAvailable from '../../../component/loading/LoadingNotAvailable';

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

const HomeForm = ({
  formRequest = {},
  isLoading = false,
  isLoadingData = false,
  isEdit = false,
  actions = {
    change: () => {},
    submit: () => {},
  },
}) => {
  const navigate = useNavigate();

  return isLoadingData ? (
    <LoadingNotAvailable isLoading={isLoadingData} />
  ) : (
    <form onSubmit={actions.submit}>
      <Card title={isEdit ? 'Form Update Siswa' : 'Form Add Siswa'}>
        <div className="w-full">
          <RowForm label="Siswa Name" isRequired>
            <FormInput
              name="name_siswa"
              value={formRequest.name_siswa}
              required
              actions={{ onChange: actions.change }}
            />
          </RowForm>

          <RowForm label="Siswa NISN" isRequired>
            <FormInput
              name="nisn_siswa"
              value={formRequest.nisn_siswa}
              required
              actions={{ onChange: actions.change }}
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
                    actions={{ onChange: actions.change }}
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
              actions={{ onChange: actions.change }}
            />
          </RowForm>

          <RowForm label="Date of Birth" isRequired>
            <FormInput
              name="tanggal_lahir"
              type="date"
              value={formRequest.tanggal_lahir}
              required
              actions={{ onChange: actions.change }}
            />
          </RowForm>

          <RowForm label="Religion" isRequired>
            <FormSelectOption
              name="agama"
              value={formRequest.agama}
              actions={{ onChange: actions.change }}
              required
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
              value={formRequest.nomor_induk_kependudukan}
              required
              actions={{ onChange: actions.change }}
            />
          </RowForm>

          <RowForm label="NIS" isRequired>
            <FormInput
              name="nomor_induk_sekolah"
              value={formRequest.nomor_induk_sekolah}
              required
              actions={{ onChange: actions.change }}
            />
          </RowForm>
        </div>

        <div className="w-full text-right">
          <button
            type="button"
            onClick={() => {
              navigate(siswaPath.main);
            }}
            disabled={isLoading}
            className="btn btn-outline btn-primary mr-4"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isEdit ? 'Update' : 'Add'}
          </button>
        </div>
      </Card>
    </form>
  );
};

export default HomeForm;
