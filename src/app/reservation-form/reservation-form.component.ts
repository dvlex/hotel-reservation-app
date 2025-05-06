import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  standalone: false,
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css',
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      let reservation = this.reservationService.getReservation(id);
      if (reservation) {
        this.reservationForm.patchValue(reservation);
      }
    } 
  }

  onSubmit() {
    if (this.reservationForm.valid) {

      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        // update reservation
        let reservation = this.reservationService.getReservation(id);
        if (reservation) {
          this.reservationService.updateReservation({
            ...reservation,
            ...this.reservationForm.value,
          });
        }

      } else {
        // new reservation
        this.reservationService.addReservation(this.reservationForm.value);
      } 


      this.router.navigate(['/list']);
      this.reservationForm.reset();
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
