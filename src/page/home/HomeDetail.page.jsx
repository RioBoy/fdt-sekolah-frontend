import { Component } from 'react';
import moment from 'moment';
import * as _ from 'lodash';
import Wrap from '../../component/layout/Wrap';
import siswaPath from '../../path/siswa.path';
import { withNavigation } from '../../component/layout/Navigation.hoc';
import { apiSiswaCRUD } from '../../service/siswa.api';
import HorizontalLoopDataLogic from '../../common/list/HorizontalLoopData.logic';
import { objectListDetail } from '../../config/objectList.config';
import CardTitle from '../../component/card/CardTitle';
import PageTitle from '../../component/general/PageTitle';
import LoadingNotAvailable from '../../component/loading/LoadingNotAvailable';

class HomeDetailPage extends Component {
  state = {
    detail: {},
    isLoading: false,
  };

  _getData = () => {
    this.setState({ isLoading: true });

    apiSiswaCRUD
      .detail(this.props?.params?.id)
      .then((resData) => {
        this.setState({ isLoading: false });

        if (!_.isEmpty(resData.data)) {
          this.setState({ detail: resData.data });
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
    const { detail, isLoading } = this.state;

    return (
      <Wrap>
        <div className="flex items-center">
          <div className="w-full">
            <PageTitle title="Siswa Detail" />
          </div>

          <div className="w-auto">
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
        </div>

        {isLoading ? (
          <LoadingNotAvailable isLoading={isLoading} />
        ) : (
          <div className="card card-body bg-white border-0 rounded-lg">
            <div className="mb-4">
              <CardTitle title="Siswa Information" />
            </div>

            <div className="flex">
              <div className="w-6/12">
                <HorizontalLoopDataLogic
                  list={[
                    objectListDetail('Siswa Name', detail.name_siswa || '-'),
                    objectListDetail(
                      'Gender',
                      _.capitalize(detail.jenis_kelamin),
                    ),
                    objectListDetail('Religion', detail.agama || '-'),
                    objectListDetail(
                      'Place of Birth',
                      detail.tempat_lahir || '-',
                    ),
                    objectListDetail(
                      'Date of Birth',
                      detail.tanggal_lahir || '-',
                    ),
                  ]}
                />
              </div>

              <div className="w-6/12">
                <HorizontalLoopDataLogic
                  list={[
                    objectListDetail('NISN', detail.nisn_siswa || '-'),
                    objectListDetail(
                      'NIK',
                      detail.nomor_induk_kependudukan || '-',
                    ),
                    objectListDetail('NIS', detail.nomor_induk_sekolah || '-'),
                    objectListDetail(
                      'Created',
                      moment(detail.createdAt).format('DD MMM YYYY HH:ss'),
                    ),
                  ]}
                />
              </div>
            </div>
          </div>
        )}
      </Wrap>
    );
  }
}

export default withNavigation(HomeDetailPage);
