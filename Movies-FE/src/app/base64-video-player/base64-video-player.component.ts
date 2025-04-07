import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-base64-video-player',
  imports: [CommonModule],
  templateUrl: './base64-video-player.component.html',
  styleUrls: ['./base64-video-player.component.css']
})
export class Base64VideoPlayerComponent implements OnInit {
  @Input() base64Video: any;

  ngOnInit(): void {
    console.log('src: ' + this.base64Video);
    
  }

  getVideoSrc(): string {
    return 'data:video/mp4;base64,' + this.base64Video;
  }
}