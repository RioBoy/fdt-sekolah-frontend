import { Component } from 'react';
import * as Icon from 'react-feather';
import { apiSiswaCRUD } from '../../service/siswa.api';
import TableThemeLogic from '../../common/table/TableTheme.logic';

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
      <div className="container">
        <div className="page-container">
          <div className="page-container-wp">
            <div className="content">
              <div className="card card-body bg-white border-0 rounded-lg">
                <div className="">
                  <TableThemeLogic
                    ths={[
                      'Siswa',
                      'Jenis Kelamin',
                      'Tempat Lahir',
                      'Agama',
                      '',
                    ]}
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
                                <a className="py-3">Edit</a>
                              </li>
                              <li className="block">
                                <a className="p-3">Delete</a>
                              </li>
                            </ul>
                          </div>
                        </>,
                      ];
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
