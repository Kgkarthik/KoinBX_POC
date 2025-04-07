import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';

dotenv.config();

const kafka = new Kafka({
  clientId: 'crypto-orders-producer',
  brokers: [process.env.KAFKA_BROKER as string],
});

const producer = kafka.producer();

export const kafkaProducer = async (order: any) => {
  await producer.connect();
  await producer.send({
    topic: process.env.KAFKA_TOPIC as string,
    messages: [
      {
        value: JSON.stringify(order),
      },
    ],
  });
  await producer.disconnect();
};
