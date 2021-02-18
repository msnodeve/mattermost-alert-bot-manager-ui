# Specifies where to get the base image (Node v12 in our case) and creates a new container for it
FROM node:latest

# Set working directory. Paths will be relative this WORKDIR.
WORKDIR /usr/src/app

# Install dependencies
COPY ./frontend/package*.json ./
RUN npm install

# Copy source files from host computer to the container
COPY . .

RUN npm install -g npm@7.5.4

# Build the app
RUN npm run build

# Run the app
# CMD [ "npm", "start" ]