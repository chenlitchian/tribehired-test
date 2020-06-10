import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit {

  post;
  postDetail;
  test= 1;
  constructor(
    private route: ActivatedRoute, private router: Router,
    private postsService: PostsService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.post = this.router.getCurrentNavigation().extras.state.post;
      } else {
        this.router.navigateByUrl('/')
      }
    });
  }

  ngOnInit() {
    console.log(this.post);

  }
  ionViewDidEnter(){
    this.getPost(this.post.id);

  }
  getPost(id) {
    this.presentLoading();

    this.postsService.getPost(id).subscribe(data => {
      this.postDetail = data
    }, (err) => {
      console.log(err);
      this.presentAlert(err['message'])
    }, () => {
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

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
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
}
