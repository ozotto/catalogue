export class Artist {
  id: number;
  first_name: string;
  last_name: string;
  is_solo_show: boolean;
  is_exhibited: boolean;
	state: {
    id: number;
    title: string;
    key: string;
  };
  exhibitor: {
    id: number;
    org_code: number;
    exh_id: number;
    exh_booth: string;
    exh_account_id: string
    exh_account_name: string;
    exh_contact_id: string;
    exh_contact_first_name: string;
    exh_contact_last_name: string;
    cat_info_complete: boolean;
    cat_banner: string;
    cat_description: string;
    cat_address1: string;
    cat_address2: string;
    cat_address3: string;
    cat_city: string;
    cat_postal_code: string;
    cat_phone: string;
    cat_fax: string;
    cat_email: string;
    cat_website: string;
    cat_logo: string;
    cat_logo_hd: string;
    created: string;
    modified: string;
    cat_com_entitled: string;
    cat_com_entitled2: string;
    edition_id: number
    exh_status: number
    cat_country: string;
    cat_sec_pri: string;
    cat_sec_seg: object;
  }
}
