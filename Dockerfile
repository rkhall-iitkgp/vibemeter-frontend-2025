# Step 1: Use an official Node.js runtime as a parent image
FROM node:20

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (or pnpm-lock.yaml if you're using pnpm)
COPY package.json pnpm-lock.yaml* ./

# Step 4: Install dependencies using pnpm
RUN npm install -g pnpm && pnpm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Run the TypeScript compilation, ignoring errors
RUN tsc --noEmit || true

# Step 7: Run the Vite build
RUN pnpm build

# Step 7: Expose the port that your application will run on (e.g., 3000 for Vite)
EXPOSE 4173

# Step 8: Define the default command to run the app (you can modify this based on how your app should start)
CMD ["pnpm", "preview"]
