/*
 * @Author: Zz
 * @Date: 2017-03-28 10:53:50
 * @Last Modified by: Zz
 * @Last Modified time: 2017-03-30 11:59:21
 */
export default {
    package200(res) {
            if (res.status !== 200) {
                return res.json().then(rst => {
                    throw new Error(`[${rst.code}] ${rst.message}`);
                });
            }
            return res.json();
        },
        package201(res) {
            if (res.status !== 201) {
                return res.json().then(rst => {
                    throw new Error(`[${rst.code}] ${rst.message}`);
                });
            }
            return res.json();
        }
}
