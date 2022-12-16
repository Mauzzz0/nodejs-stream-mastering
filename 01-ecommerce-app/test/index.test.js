import {expect, describe, test, jest} from '@jest/globals';
import Payment from "../src/events/payment.js";
import PaymentSubject from "../src/subjects/paymentSubject.js";
import Shipment from "../src/observers/shipment.js";
import Marketing from "../src/observers/marketing.js";



describe('test Suite for Observer Pattern', () => {
    test('#PaymentSubject notify observers', () => {
        const subject = new PaymentSubject();
        const observer = {
            update: jest.fn()
        }
        const data = 'hello world';
        const expected = data;

        subject.subscribe(observer);
        subject.notify(data);

        expect(observer.update).toBeCalledWith(expected);
    });

    test('$PaymentSubject should not notify unsubscribed observers', () => {
        const subject = new PaymentSubject();
        const observer = {
            update: jest.fn()
        }
        const data = 'hello world';
        const expected = data;

        subject.subscribe(observer);
        subject.unsubscribe(observer);
        subject.notify(data);

        expect(observer.update).not.toBeCalledWith(expected);
    });

    test('#Payment should notify subject after a credit card transaction', () => {
        const subject = new PaymentSubject();
        const payment = new Payment(subject);

        const paymentSubjectNotifierSpy = jest.spyOn(subject, subject.notify.name);

        const data = {userName: 'semak', id: 3};
        payment.creditCard(data);

        expect(paymentSubjectNotifierSpy).toBeCalledWith(data);
    });

    test('#All should notify subscribers after a credit car payment', () => {
        const subject = new PaymentSubject();
        const shipment = new Shipment();
        const marketing = new Marketing();
        const payment = new Payment(subject);

        subject.subscribe(marketing);
        subject.subscribe(shipment);
        const data = {id: 4, userName: 'rsemak'};
        const shipmentUpdateSpy = jest.spyOn(shipment, shipment.update.name);
        const marketingUpdateSpy = jest.spyOn(marketing, marketing.update.name);

        payment.creditCard(data);

        expect(shipmentUpdateSpy).toBeCalledWith(data)
        expect(marketingUpdateSpy).toBeCalledWith(data)
    });
})