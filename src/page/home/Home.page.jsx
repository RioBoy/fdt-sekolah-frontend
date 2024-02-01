import { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import { apiSiswaCRUD } from '../../service/siswa.api';
import TableThemeLogic from '../../common/table/TableTheme.logic';
import Wrap from '../../component/layout/Wrap';
import siswaPath from '../../path/siswa.path';

class HomePage extends Component {
  state = {
    siswa: [],
  };

  _getData = () => {
    apiSiswaCRUD
      .list()
      .then((resData) => {
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
    const { siswa } = this.state;

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
              tds={siswa.map((vm) => {
                return [
                  <>
                    <p>{vm.name_siswa || '-'}</p>
                  </>,
                  <>
                    <p>{vm.jenis_kelamin || '-'}</p>
                  </>,
                  <>
                    <p>{vm.tempat_lahir || '-'}</p>
                  </>,
                  <>
                    <p>{vm.agama || '-'}</p>
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
                            <li className="block">
                              <Link to="/detail" className="py-3">
                                Detail
                              </Link>
                            </li>
                            <li className="block">
                              <Link to="/edit" className="py-3">
                                Edit
                              </Link>
                            </li>
                            <li className="block">
                              <a className="p-3">Delete</a>
                            </li>
                          </ul>
                        </div>
                      </>
                    ),
                  },
                ];
              })}
            />
          </div>
        </div>
      </Wrap>
    );
  }
}

export default HomePage;
