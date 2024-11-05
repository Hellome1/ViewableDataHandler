import store from '@/store/index'

export const inject = (...args) => {
  let o = {};
  args.forEach(arg => {
    let storeModule = store.state[arg];
    for (let k in storeModule) {
      o[k] = () => storeModule[k];
    }
  });
  return o;
}