import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { faCrown } from '@fortawesome/free-solid-svg-icons/faCrown';
import { Driver } from '../../core/interfaces/driver';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverComponent {

  @Input() public driver: Driver = { firstName: '', lastName: '', code: '', number: '' };
  @Input() public showCrown = false;

  public icon = faCrown;


}
