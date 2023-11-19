
class Engine {
	constructor(time_step, update, render) {

		this.accumulated_time = 0; // Amount of time that's accumulated since the last update.
		this.animation_frame_request = undefined, // reference to the AFR
		this.time = undefined, // The most recent timestamp of loop execution.
		this.time_step = time_step, // 1000/30 = 30 frames per second

		this.updated = false; // Whether or not the update function has been called since the last cycle.

		this.update = update; // The update function
		this.render = render; // The render function

		this.run = function (time_stamp) {

			this.accumulated_time += time_stamp - this.time;
			this.time = time_stamp;

			/* If the device is too slow, updates may take longer than our time step. If
			this is the case, it could freeze the game and overload the cpu. To prevent this,
			we catch a memory spiral early and never allow three full frames to pass without
			an update. This is not ideal, but at least the user won't crash their cpu. */
			if (this.accumulated_time >= this.time_step * 3) {
				this.accumulated_time = this.time_step;
			};

			/* Since we can only update when the screen is ready to draw and requestAnimationFrame
			calls the run function, we need to keep track of how much time has passed. We
			store that accumulated time and test to see if enough has passed to justify
			an update. Remember, we want to update every time we have accumulated one time step's
			worth of time, and if multiple time steps have accumulated, we must update one
			time for each of them to stay up to speed. */
			while (this.accumulated_time >= this.time_step) {
				this.accumulated_time -= this.time_step;

				this.update(time_stamp);

				this.updated = true; // If the game has updated, we need to draw it again.
			};

			/* This allows us to only draw when the game has updated. */
			if (this.updated) {
				this.updated = false;
				this.render(time_stamp);
			};

			this.animation_frame_request = window.requestAnimationFrame(this.handleRun);
		};

		this.handleRun = (time_step) => { this.run(time_step); };

	}
	start() {

		this.accumulated_time = this.time_step;
		this.time = window.performance.now();
		this.animation_frame_request = window.requestAnimationFrame(this.handleRun);

	}
	stop() { window.cancelAnimationFrame(this.animation_frame_request); }
}


