import axios from 'axios';
import FormData from 'form-data';
import { TextEncoder, TextDecoder } from 'util';  // Import TextEncoder polyfill

const pinataApiKey = '38d6238d55e1040daf9b';
const pinataSecretApiKey = '5e09348357ebcbaf5744f931867629708a67a3d20809a40409a7bd8217771e23';

export const pinStringToIPFS = async (stringData) => {
  try {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const uint8Array = encoder.encode(stringData);  // Fix: Change 'string' to 'stringData'
    const pinataApiUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
    const formData = new FormData();
    formData.append('file', Buffer.from(stringData, 'utf-8'), { filename: 'string.txt' });

    const response = await axios.post(`${pinataApiUrl}/pinning/pinFileToIPFS`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    });

    const cid = response.data.IpfsHash;
    console.log('String data pinned to IPFS with CID:', cid);
    return cid;
  } catch (error) {
    console.error('Error pinning string data to IPFS:', error);
    throw error;
  }
};
