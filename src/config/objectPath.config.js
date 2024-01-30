import * as _ from 'lodash';

export const objectPathEndPointAPI = (menu = '', addFeatures = []) => {
  const _configWithId = (menuId, name) => menu + '/' + menuId + name;

  const features = {};
  if (!_.isEmpty(addFeatures)) {
    addFeatures.map((vm) => {
      const { name, path, isMenuId = false } = vm;

      if (!_.isEmpty(name)) {
        features[name] = isMenuId
          ? (menuId) => _configWithId(menuId, path)
          : menu + path;
      }
    });
  }

  return {
    main: menu,
    detail: (menuId) => _configWithId(menuId, '/detail'),
    update: (menuId) => _configWithId(menuId, '/update'),
    delete: (menuId) => _configWithId(menuId, '/delete'),
    ...features,
  };
};
