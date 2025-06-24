import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HMenu, HMenuComponent } from '@h-core/ui';

@Component({
  imports: [CommonModule, HMenuComponent],
  selector: 'app-creator-entry',
  templateUrl: './creator.html',
  styleUrls: ['./creator.scss'],
})
export class RemoteEntry {
    navItems: HMenu = {
      items: [
        {
          displayName: 'AngularMix',
          iconName: 'close',
          children: [
            {
              displayName: 'Speakers',
              iconName: 'group',
              children: [
                {
                  displayName: 'Michael Prentice',
                  iconName: 'person',
                  route: 'michael-prentice',
                  children: [
                    {
                      displayName: 'Delight your Organization',
                      iconName: 'star_rate',
                      route: 'material-design'
                    }
                  ]
                },
                {
                  displayName: 'Stephen Fluin',
                  iconName: 'person',
                  route: 'stephen-fluin',
                  children: [
                    {
                      displayName: 'What\'s up with the Web?',
                      iconName: 'star_rate',
                      route: 'what-up-web'
                    }
                  ]
                },
                {
                  displayName: 'Mike Brocchi',
                  iconName: 'person',
                  route: 'mike-brocchi',
                  children: [
                    {
                      displayName: 'My ally, the CLI',
                      iconName: 'star_rate',
                      route: 'my-ally-cli'
                    },
                    {
                      displayName: 'Become an Angular Tailor',
                      iconName: 'star_rate',
                      route: 'become-angular-tailer'
                    }
                  ]
                }
              ]
            },
            {
              displayName: 'Sessions',
              iconName: 'speaker_notes',
              children: [
                {
                  displayName: 'Delight your Organization',
                  iconName: 'star_rate',
                  route: 'material-design'
                },
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'what-up-web'
                },
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'my-ally-cli'
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'become-angular-tailer'
                }
              ]
            },
            {
              displayName: 'Feedback',
              iconName: 'feedback',
              route: 'feedback'
            }
          ]
        }
      ]
    };
}
