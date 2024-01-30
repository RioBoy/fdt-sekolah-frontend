import { objectPathEndPointAPI } from '../config/objectPath.config';

const baseAPISekolahManagement = import.meta.env
  .VITE_BASE_API_SEKOLAH_MANAGEMENT;

export const SrvSiswa = objectPathEndPointAPI(
  baseAPISekolahManagement + '/siswa',
);
