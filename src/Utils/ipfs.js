import axios from 'axios';

export const uploadFileToIpfs = async (data) => {
  try {
    const uploadedData = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
      maxBodyLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data`,
        pinata_api_key: 'd0d78c26ec79a45a2539',
        pinata_secret_api_key: '3e9d6e5dcd65d74734b60d7d79c38d4cd19ab948bbbb3f282f02e352ac0f7c9e',
      },
    });
    return uploadedData.data.IpfsHash;
  } catch (error) {
    console.log(error);
  }
};

export const uploadJsonToIpfs = async (data) => {
  try {
    const uploadedData = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', data, {
      headers: {
        pinata_api_key: 'd0d78c26ec79a45a2539',
        pinata_secret_api_key: '3e9d6e5dcd65d74734b60d7d79c38d4cd19ab948bbbb3f282f02e352ac0f7c9e',
      },
    });
    return uploadedData.data.IpfsHash;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFileInIpfs = async (hash) => {
  const result = await axios
    .delete(`https://api.pinata.cloud/pinning/unpin/${hash}`, {
      headers: {
        pinata_api_key: 'd0d78c26ec79a45a2539',
        pinata_secret_api_key: '3e9d6e5dcd65d74734b60d7d79c38d4cd19ab948bbbb3f282f02e352ac0f7c9e',
      },
    })
    .then(function (res) {
      console.log('res: ', res);
      return true;
    })
    .catch(function (e) {
      console.log('error:', e);
      return false;
    });
  return result;
};
