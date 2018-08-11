// Smart DataTable
export var settings = {
  selectMode: 'multi',
  columns: {
    id: {
      title: 'ID',
      filter: false,
    },
    exhibitor: {
      title: 'Banner',
      valuePrepareFunction: (exhibitor) => {
        return exhibitor.cat_banner;
      },
      filter: false,
    },
    title: {
      title: 'Title',
      filter: false,
    },
    artist: {
      title: 'Artist',
      valuePrepareFunction: (artist) => {
        return artist.first_name + " " +artist.last_name;
      },
      filter: false,
    },
    state: {
      title: 'Validation',
      valuePrepareFunction: (state) => {
        return state.title;
      },
      filter: {
        type: 'list',
        config: {
          selectText: 'Select...',
          list: [
            { value: 1, title: 'Publie' },
            { value: 2, title: 'Brouillon' },
            { value: 3, title: 'En attente de validation' },
          ],
        },
      },
    }
  },
  attr: {
    class: "table table-responsive"
  },
  edit:{
    editButtonContent: '<i class="ft-edit-2 info font-medium-1 mr-2"></i>'
  },
  delete:{
    deleteButtonContent: '<i class="ft-x danger font-medium-1 mr-2"></i>'
  }
};
