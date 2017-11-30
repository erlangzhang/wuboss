/*
 * @Author: Zz
 * @Date: 2017-03-28 10:49:07
 * @Last Modified by: Zz
 * @Last Modified time: 2017-04-12 13:45:26
 */
import queryStr from 'querystring';
import request from './request';
import functionPool from './functionPool';

class PicStore {
  constructor() {}

  list(params) {
    const url = '/wushu/api/pictures';
    return request(`${url}?${queryStr.stringify(params)}`).then(functionPool.package200);
  }

  create(body) {
    const url = `/wushu/api/pictures`;
    return request(url, body).then(functionPool.package201);
  }

  retrieve(id) {
    const url = '/wushu/api/pictures';
    return request(`${url}/${id}`).then(functionPool.package200);
  }

  update(id, body) {
    const url = '/wushu/api/pictures';
    return request(`${url}/${id}`, body).then(functionPool.package200);
  }

  listPicTags() {
    const url = `/wushu/api/pictures/tags`;
    return request(url).then(functionPool.package200);
  }

  batchDelete(pictureIds) {
    const url = '/wushu/api/pictures/batchDelete';
    return request(`${url}`, {
      pictureIds
    }).then(functionPool.package200);
  }
}

module.exports = new PicStore();
