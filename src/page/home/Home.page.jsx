import { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import * as _ from 'lodash';
import { apiSiswaCRUD } from '../../service/siswa.api';
import TableThemeLogic from '../../common/table/TableTheme.logic';
import Wrap from '../../component/layout/Wrap';
import siswaPath from '../../path/siswa.path';
import { MDGeneralRemove } from '../../config/modal.config';
import { actionModal } from '../../helper/actionModal.helper';
import { ModalMiddle } from '../../component/modal/ModalMiddle';

class HomePage extends Component {
  state = {
    isLoading: false,
    isLoadingDelete: false,
    siswa: [],
    selectedSiswa: {},
  };

  _handleModal = (data = {}) => {
    actionModal(MDGeneralRemove, _.isEmpty(data));
    this.setState({ selectedSiswa: !_.isEmpty(data) ? data : {} });
  };

  _handleDelete = () => {
    this.setState({ isLoadingDelete: true });

    apiSiswaCRUD
      .delete(this.state.selectedSiswa?.uuid)
      .then((resData) => {
        this._handleModal({});
        this.setState({ isLoadingDelete: false }, () => {
          this._getData();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  _getData = () => {
    this.setState({ isLoading: true });

    apiSiswaCRUD
      .list()
      .then((resData) => {
        this.setState({ isLoading: false });
        this.setState({ siswa: resData?.data?.entry || [] });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this._getData();
  }

  render() {
    const { siswa, isLoading, isLoadingDelete } = this.state;

    return (
      <Wrap>
        <div className="card card-body bg-white border-0 rounded-lg">
          <div className="flex items-center mb-6">
            <div className="w-full">
              <h5 className="text-lg font-medium mb-0">Siswa</h5>
            </div>

            <div className="w-auto">
              <Link to={siswaPath.add} className="btn btn-primary text-nowrap">
                Add New
              </Link>
            </div>
          </div>

          <div className="w-full">
            <TableThemeLogic
              ths={['Siswa', 'Jenis Kelamin', 'Tempat Lahir', 'Agama', '']}
              isLoading={isLoading}
              tds={siswa
                .sort((a, b) => {
                  return new Date(b?.createdAt) - new Date(a?.createdAt);
                })
                .map((vm) => {
                  return [
                    <>
                      <p>{vm.name_siswa || '-'}</p>
                    </>,
                    <>
                      <p>{_.capitalize(vm.jenis_kelamin) || '-'}</p>
                    </>,
                    <>
                      <p>{vm.tempat_lahir || '-'}</p>
                    </>,
                    <>
                      <p>{_.capitalize(vm.agama) || '-'}</p>
                    </>,
                    {
                      className: 'text-end',
                      content: (
                        <>
                          <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button">
                              <Icon.MoreHorizontal size={18} />
                            </div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content z-[1] menu py-2 px-4 bg-white rounded-lg shadow-md w-32"
                            >
                              {/* <li className="block">
                                <Link
                                  to={siswaPath.detail(vm.uuid)}
                                  className="py-3"
                                >
                                  Detail
                                </Link>
                              </li> */}
                              <li className="block">
                                <Link
                                  to={siswaPath.edit(vm.uuid)}
                                  className="py-3"
                                >
                                  Edit
                                </Link>
                              </li>
                              <li className="block">
                                <button
                                  type="button"
                                  className="py-3"
                                  onClick={() => this._handleModal(vm)}
                                >
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </>
                      ),
                    },
                  ];
                })}
            />

            <ModalMiddle id={MDGeneralRemove}>
              <h5 className="text-xl text-center">Are you sure to remove?</h5>

              <p className="text-sm text-slate-400 text-center my-6">
                The data will be removed from the system forever and you will
                not be able to retrieve it later.
              </p>

              <div className="w-full">
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    disabled={isLoadingDelete}
                    className="btn btn-outline btn-primary mr-4"
                    onClick={() => this._handleModal()}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    disabled={isLoadingDelete}
                    className="btn btn-primary"
                    onClick={() => this._handleDelete()}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </ModalMiddle>
          </div>
        </div>
      </Wrap>
    );
  }
}

export default HomePage;
