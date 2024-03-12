export interface ListProps {
  title?: string;
  wrapVariant?: string;
  wrapDropdownVariant?: string;
  wrapDropdownChildVariant?: string;
  wrapTextChildVariant?: string;
  wrapTextChildColorVariant_1?: string;
  wrapTextChildColorVariant_2?: string;
  handleOpenReceptMessage?: (data: {
    id: string;
    name?: string;
    avt?: string;
  }) => void;
  listUser: Record<
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
}
