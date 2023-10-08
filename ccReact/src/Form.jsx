function Form(){

    return (
        <form id="userInput">
            <div className="inputSec">
              <div className="inputField">
                <label htmlFor="year">Year</label>
                <select name="year" id="year">
                  <option value="none" selected hidden>
                    Year of your vehicle
                  </option>
                </select>
              </div>

              <div className="inputField">
                <label htmlFor="make">Make</label>
                <select name="make" id="make">
                  <option value="none" selected hidden>
                    Make of your vehicle
                  </option>
                </select>
              </div>

              <div className="inputField">
                <label htmlFor="model">Model</label>
                <select name="model" id="model" disabled>
                  <option value="none" selected hidden>
                    Model of your vehicle
                  </option>
                </select>
              </div>

              <div className="inputField">
                <label htmlFor="locA">Location A</label>
                <div>
                  <input
                    type="text"
                    list="locationA"
                    id="locA"
                    name="locA"
                    placeholder="e.g University of California Riverside"
                  />
                  <datalist id="locationA"></datalist>
                </div>
              </div>

              <div className="inputField">
                <label htmlFor="locB">Location B</label>
                <div>
                  <input
                    type="text"
                    id="locB"
                    list="locationB"
                    name="locB"
                    placeholder="e.g SoFi Stadium"
                  />
                  <datalist id="locationB"></datalist>
                </div>
              </div>

              <div className="inputField">
                Round trip?
                <div>
                  <label htmlFor="yes">Yes</label>
                  <input
                    type="radio"
                    name="round_trip"
                    id="yes"
                    value="yes"
                    checked
                  />

                  <label htmlFor="no">No</label>
                  <input type="radio" name="round_trip" id="no" value="no" />
                </div>
              </div>

              <div className="inputField">
                <label htmlFor="trips">Number of trips</label>
                <input
                  type="number"
                  id="trips"
                  name="trips"
                  min="1"
                  step="1"
                  max="1000000"
                  value="1"
                />
              </div>
            </div>
          </form>
    )
}

export default Form ;