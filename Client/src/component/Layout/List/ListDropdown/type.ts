export interface ListProps {
  title?: string;
  wrapVariant?: string;
  wrapDropdownVariant?: string;
  wrapDropdownChildVariant?: string;
  wrapTextChildVariant?: string;
  wrapTextChildColorVariant_1?: string;
  wrapTextChildColorVariant_2?: string;
  handleOpenReceptMessage?: (data: clickUser) => void;
  listUserRecord?: Record<
    string,
    {
      member: {
        _id: string;
        name?: string;
        avt?: string;
      };
      roomId: string;
      online?: boolean;
    }
  >;

  searchUser?: Array<
    Record<
      string,
      {
        _id: string;
        name?: string;
        avt?: string;
      }[]
    >
  >;
}

export type clickUser = {
  id: string;
  name?: string;
  avt?: string;
};

export type searchUser = Array<
  Record<
    string,
    {
      _id: string;
      name?: string;
      avt?: string;
    }[]
  >
>;
