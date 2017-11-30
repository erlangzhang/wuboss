/*
 * @Author: Zz
 * @Date: 2017-03-17 12:50:31
 * @Last Modified by: Zz
 * @Last Modified time: 2017-04-01 11:50:49
 */
import 'isomorphic-fetch';

export default (url, body, method) => (
    fetch(url, {
        method: method || (body ? 'POST' : 'GET'),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: sessionStorage.getItem('jwt:token'),
        },
        body: JSON.stringify(body),
        credentials: 'include',
    })
);
