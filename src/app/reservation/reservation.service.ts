import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];

  constructor() {
    const storedReservations = localStorage.getItem('reservations');
    this.reservations = storedReservations ? JSON.parse(storedReservations) : [];
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find((reservation) => reservation.id === id);
  }

  addReservation(reservation: Reservation): void {
    this.reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  deleteReservation(reservation: Reservation): void {
    const index = this.reservations.indexOf(reservation);
    if (index > -1) {
      this.reservations.splice(index, 1);
      localStorage.setItem('reservations', JSON.stringify(this.reservations));
    }
  }

  updateReservation(updateReservationReservation: Reservation): void {
    const index = this.reservations.findIndex(
      (reservation) => reservation.id === updateReservationReservation.id
    );
    if (index > -1) {
      this.reservations[index] = updateReservationReservation;
      localStorage.setItem('reservations', JSON.stringify(this.reservations));
    }
  }
}
