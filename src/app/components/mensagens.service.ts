import { Injectable } from '@angular/core';
import * as jQuery from 'jquery';
import 'bootstrap-notify';
let $: any = jQuery;

@Injectable({
  providedIn: 'root'
})
export class MensagensService {

  constructor() { }

  
  showNotification(type,from, align, msg :any){

    $.notify({
        message: msg
    },{
        type: type,
        timer: 100,
        placement: {
            from: from,
            align: align
        },
        template: 
          '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
          '<i class="fa fa-bell" data-notify="icon"></i> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
}
