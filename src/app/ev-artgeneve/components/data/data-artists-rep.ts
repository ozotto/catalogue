// Smart DataTable
export var settings = {
  selectMode: 'multi',
  columns: {
    id: {
      title: 'ID',
      //filter: false,
      filter: {
        type: 'checkbox',
        config: {
          true: 'Yes',
          false: 'No',
          resetText: 'clear',
        },
      },
    },
    exhibitor:{
      title: 'Banner',
      valuePrepareFunction: (exhibitor) => {
        return exhibitor.cat_banner;
      },
      
      sort : false,
      filter: true,
      filterFunction: (value, search) => {
        console.log('value '+value )
        console.log('search '+search )
        /*let match = this.transformDate(value).indexOf(search) > -1
        if (match || search === '') { return true; }
        else { return false; }*/
      },
    },
    last_name: {
      title: 'Name',
      filter: false,
      /*filter: {
        type: 'completer',
        config: {
          completer: {
            data: this.source,
            searchFields: 'Name',
            titleField: 'Name',
          },
        },
      },*/
    },
    first_name: {
      title: 'First Name',
      filter: false,
    },
    state: {
      title: 'Validation',
      valuePrepareFunction: (state) => {
        return state.title;
      },
      sort : false,
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
      }
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