import { buildSchema } from "graphql";


var schema = buildSchema(`
  type user{
    _id:ID
    name:String!,
    email:String!,
    password:String,
    createEvents:[ID]
  }

  type Event{
      _id:ID
      title:String!
      description:String!
      price:Float!
      creator:user
      date:String
  }


  type Booking{
    _id:ID
    eventId:ID!
    userId:ID!
    createdAt:String!
    updatedAt:String!
  }

  type BookingFull{
    _id:ID
    eventId:Event
    userId:user
    createdAt:String!
    updatedAt:String!
  }

  type authData{
    userid:ID!
    token:String!
    tokenExpire:Int
  }


  input userInput{
    name:String!,
    email:String!,
    password:String
  }

  input bookingInput{
    userId:ID!,
    eventId:ID!
  }


    input EventInput{
        title:String!,
        description:String!,
        price:Float!,
        date:String,
        creator:ID!
    }

    type RootQuery {
      events:[Event!]!
      bookings:[BookingFull!]
      login(email:String!,password:String!):authData
    },
  

    type RootMutation{
      createEvent(EventInput:EventInput):Event
      createUser(userInput:userInput):user
      bookingEvent(bookingInput:bookingInput):Booking
      cancelBooking(id:ID):BookingFull
    }

  schema{
      query:RootQuery,
      mutation:RootMutation
      
  }

`);

export default schema;

