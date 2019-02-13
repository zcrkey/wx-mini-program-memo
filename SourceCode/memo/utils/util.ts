/**
 * 格式化日期
 */
export function formatTime(date: Date, dateSignTemp?: string, timeSignTemp?: string): string {
  const dateSign = dateSignTemp ? dateSignTemp : "/"
  const timeSign = timeSignTemp ? timeSignTemp : ":"
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join(dateSign) + ' ' + [hour, minute, second].map(formatNumber).join(timeSign)
}

/**
 * 随机数
 */
export function randomNumber() {
  return Math.round(Math.random() * 10000) + new Date().getTime() + "";
}

/**
 * 复制对象，将obj中对应值赋予target
 * @param target 目标
 * @param obj 要复制的值
 * @param defaults 默认值对象
 * @returns {any} 复制后的对象
 */
export function copy(target: any, obj: any, defaults?: any) {
  if (defaults) {
    copy(target, defaults);
  }
  if (target && obj && typeof obj === "object") {
    let i: any;
    for (i in target) {
      target[i] = obj[i];
    }
    for (i in obj) {
      target[i] = obj[i];
    }
  }
  return target;
}

/**
 * 删除数组中，指定的对象
 * @param array 数组
 * @param removeEl 指定对象
 */
export function arrayRemove(array: any[], removeEl: any) {
  if (array == null || removeEl == null) {
    return;
  }
  if (Array.isArray(removeEl)) {
    for (let j = 0, jlen = removeEl.length; j < jlen; j++) {
      for (let i = 0, ilen = array.length; i < ilen; i++) {
        if (array[i] === removeEl[j]) {
          array.splice(i, 1);
          break;
        }
      }
    }
  } else {
    for (let i = 0, len = array.length; i < len; i++) {
      if (array[i] === removeEl) {
        array.splice(i, 1);
        return;
      }
    }
  }
}

const formatNumber = (n: number) => {
  const str = n.toString()
  return str[1] ? str : '0' + str
}
