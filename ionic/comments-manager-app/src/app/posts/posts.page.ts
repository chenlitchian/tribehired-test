import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  posts = [];

  constructor(
    private postsService: PostsService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {

  }
  ionViewDidEnter(){
    this.presentLoading();

    this.postsService.getAllPosts().subscribe((data:any) => {
      this.posts = data;
    }, (err) => {
      this.presentAlert(err)
    },()=>{
      this.loadingCtrl.dismiss();
    })
  }

 async presentLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async presentAlert(message) {
    const alert = await this.alertCtrl.create({
      header: '',
      subHeader: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  openPost(post){
    let navigationExtras: NavigationExtras = {
      state: {
        post: post
      }
    };
    this.router.navigate(['/post-detail'], navigationExtras)
  }

}
