import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'
import { setOrbitdb } from 'Store/actions';
import store from 'Store/index';
let orbitdb

// ipfs配置
const ipfsConfig = {
    preload: {
        enabled: false // 禁止使用所谓的“预加载”IPFS 节点
      },
      // repo: './ipfs',
      EXPERIMENTAL: { pubsub: true }, //这是一种节点之间通信的方法，并且是 OrbitDB 使用所必需的，无论我们是否连接到其他对等点。
      config: {
        Addresses: {
          Swarm: [
            '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
            '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/',
            '/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/'
          ]
        }
      }
}


export const initOrbitDB = async () => {
// 初始化IPFS
const ipfs = await IPFS.create(ipfsConfig)
// 初始化OrbitDB
orbitdb = await OrbitDB.createInstance(ipfs)
await store.dispatch(setOrbitdb(orbitdb));
return orbitdb
}
// 根据数据库地址连接数据库
export const getDB = async (address, orbit) => {
    let db
    orbitdb = orbit || orbitdb
    if (orbitdb) {
      db = await orbitdb.open(address)
      await db.load()
    }
    return db
}
// 创建数据库
export const createDatabase = async (name) => {
  const accessController = { write: ['*'] }
    const db = await orbitdb.create(name, 'keyvalue', { accessController })
    return db
}