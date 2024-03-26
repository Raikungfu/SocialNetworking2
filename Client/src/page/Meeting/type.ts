export interface Meeting {
  _id: string;
  peer: Array<ICE>;
}

export interface ICE {
  _id?: string;
  _roomId: string;
  _userId: string;
  offer: RTCSessionDescriptionInit;
  answer?: RTCSessionDescriptionInit;
  candidate?: RTCIceCandidateInit;
}

export interface ICEUnit {
  _userId: string;
  candidate?: RTCIceCandidateInit;
}

export interface peer {
  rtcPeer: RTCPeerConnection;
  userId?: string;
  remoteStream: MediaStream;
  listCandidate: RTCIceCandidateInit[];
}
