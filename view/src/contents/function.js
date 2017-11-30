/*
 * @Author: Zz
 * @Date: 2017-04-19 16:12:04
 * @Last Modified by: Zz
 * @Last Modified time: 2017-05-17 13:43:25
 */
import { appStore } from '../stores';
export default {
  columnPageDataConvertDB (pageData, epgs, language) {
    const itemObj = JSON.parse(JSON.stringify(pageData));
    const tmp = {
      type: itemObj.type,
      action: itemObj.action,
      isLeafNode: itemObj.isLeafNode,
      // name: itemObj.name,
      description: itemObj.description,
      language: [],
      style: [],
      // userId: appStore.payload.id,
      // userName: appStore.payload.name,
    };
    for (const item in itemObj) {
      const opt = itemObj[item];
      let isBreak = false;
      // 语言配置
      for(const languageItem of language) {
        if (item === languageItem.code) {
          if (opt.name) {
            tmp.language.push(opt);
          }
          isBreak = true;
          break;
        }
      }
      if (isBreak) {
        continue;
      }
      for (const epgItem of epgs) {
        if (item === epgItem) {
          const epgTmp = {
            styleName: opt.styleName,
            content: [],
          };
          for (const lanIt in opt) {
            for(const languageItem of language) {
              if (lanIt === languageItem.code) {
                if (!opt[lanIt].icon.url && !opt[lanIt].highlightIcon.url && opt[lanIt].pics.length === 0) {
                  break;
                }
                if (!opt[lanIt].icon.url || !opt[lanIt].highlightIcon.url) {
                  return null;
                }
                
                const pics = [{
                  type: 13,
                  ...opt[lanIt].icon,
                }];
                pics.push({
                  type: 14,
                  ...opt[lanIt].highlightIcon,
                });
                
                const tmpP = opt[lanIt].pics.map(item => {
                  return {
                    type: 15,
                    ...item,
                  }
                });
                opt[lanIt].pics = pics.concat(tmpP);
                delete opt[lanIt].icon;
                delete opt[lanIt].highlightIcon;
                epgTmp.content.push(opt[lanIt]);
                break;
              }
            }
          }
          if (epgTmp.content.length !== 0)
            tmp.style.push(epgTmp);
        }
      }
    }
    return tmp;
  },
  columnDB2PageData (db, epgs, language) {
    const data = db;
    const itemObj = {};
    itemObj.action = data.action;
    itemObj.name = data.name;
    itemObj.isLeafNode = data.isLeafNode;
    itemObj.description = data.description;
    // 栏目名称
    for (const item of data.language) {
      itemObj[item.languageType] = item;
    }
    // epg 配置
    for (const item of data.style) {
      itemObj.epgChecked.push(item.styleName);
      const tmp = {
        styleName: item.styleName,
        langChecked: [],
      }
      for (const it of item.content) {
        const iconData = {
          languageType: it.languageType,
          highlightIcon: it.highlightIcon,
          icon: it.icon,
          pics: it.pics,
        };
        tmp[it.languageType] = iconData;
        for (const lan of language) {
          if (lan.code === it.languageType) {
            tmp.langChecked.push(lan.name);
            tmp[lan.name] = iconData;
            break;
          }
        }
        if (tmp.langChecked.length !== 0) {
          tmp.langTabValue = tmp.langChecked[0];
          tmp.langTabs = tmp.langChecked.map(item => {
            return {
              title: `${item}`,
              name: item,
            };
          });
        }
      }
      itemObj[item.styleName] = tmp;
    }
    return itemObj;
  }
}