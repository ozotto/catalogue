
export class Exhibitor {
  id: number;
  exhibitor: {
      id: number;
      org_code: string;
      exh_id: string;
      exh_booth: string;
      exh_account_id: string;
      exh_account_name: string;
      exh_contact_id: string;
      exh_contact_mail: string;
      exh_contact_first_name: string;
      exh_contact_last_name: string;
      cat_info_complete: boolean;
      cat_banner: string;
      cat_description: string;
      cat_address1: string;
      cat_address2: string;
      cat_address3: string;
      cat_city: string;
      cat_state: number;
      cat_postal_code: string;
      cat_phone: string;
      cat_fax: string;
      cat_email: string;
      cat_website: string;
      cat_logo: string;
      cat_logo_hd: string;
      created: string;
      modified: string;
      edition_id: {
      id: number;
        year: string;
        code: string;
        is_active: boolean;
        event: number;
    };
    exh_status: {
      id: number;
        code: number;
        title: string;
    };
    cat_country: {
      id: number;
        cat_country_name: string;
        cat_country_code: string;
    };
    state: {
      id: number;
        title: string;
        key: string;
    };
    // cat_product_and_services: string[]
  }
}
