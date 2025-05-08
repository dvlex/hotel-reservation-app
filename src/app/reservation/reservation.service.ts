import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private reservations: Reservation[] = [];

  // Uncomment the following lines to use localStorage
  //constructor() {
  //  const storedReservations = localStorage.getItem('reservations');
  //  this.reservations = storedReservations ? JSON.parse(storedReservations) : [];
  //}
  private apiUrl = 'http://192.168.1.72:3000';

  constructor(private httpClient: HttpClient) {}

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  getReservations(): Observable<Reservation[]> {
    // return this.reservations;
    return this.httpClient.get<Reservation[]>(this.apiUrl + '/reservations');
  }

  getReservation(id: string): Observable<Reservation> | undefined {
    return this.httpClient.get<Reservation>(this.apiUrl + '/reservation/' + id);
    //return this.reservations.find((reservation) => reservation.id === id);
  }

  addReservation(reservation: Reservation): Observable<void> {
    reservation.id = this.generateUUID();
    return this.httpClient.post<void>(
      this.apiUrl + '/reservation',
      reservation
    );
    // this.reservations.push(reservation);
    // localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }

  deleteReservation(reservation: Reservation): Observable<void> {
    return this.httpClient.delete<void>(
      this.apiUrl + '/reservation/' + reservation.id
    );

    //const index = this.reservations.indexOf(reservation);
    //if (index > -1) {
    //  this.reservations.splice(index, 1);
    // localStorage.setItem('reservations', JSON.stringify(this.reservations));
    //}
  }

  updateReservation(
    updateReservationReservation: Reservation
  ): Observable<void> {
    return this.httpClient.put<void>(
      this.apiUrl + '/reservation/' + updateReservationReservation.id,
      updateReservationReservation
    );

    //const index = this.reservations.findIndex(
    //  (reservation) => reservation.id === updateReservationReservation.id
    //);
    //if (index > -1) {
    //  this.reservations[index] = updateReservationReservation;
    // localStorage.setItem('reservations', JSON.stringify(this.reservations));
    //}
  }
}
