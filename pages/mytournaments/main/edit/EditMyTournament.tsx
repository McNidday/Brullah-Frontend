import styles from "./styles.module.scss";
import cn from "classnames";

const EditMyTournament = () => {
  return (
    <>
      <div></div>
      <div className={cn(styles.brackets)}>
        <div className={styles.container}>
          <div
            className={cn(styles.tournamentBracket, "tournamentBracketRounded")}
          >
            <div className={cn(styles.tournamentBracketRound)}>
              <h3 className={cn(styles.tournamentBracketRoundTitle)}>
                Quarterfinals
              </h3>
              <ul className={cn(styles.tournamentBracketList)}>
                <li className={cn(styles.tournamentBracketItem)}>
                  <div className={cn(styles.tournamentBracketMatch)}>
                    <table className={cn(styles.tournamentBracketTable)}>
                      <caption className={cn(styles.tournamentBracketCaption)}>
                        <time>18 February 1998</time>
                      </caption>
                      <thead className={cn(styles.srOnly)}>
                        <tr>
                          <th>Country</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody className={cn(styles.tournamentBracketContent)}>
                        <tr
                          className={cn(
                            styles.tournamentBracketTeam,
                            "tournamentBracketTeamWinner"
                          )}
                        >
                          <td className={cn(styles.tournamentBracketCountry)}>
                            <abbr
                              className={cn(styles.tournamentBracketCode)}
                              title="Canada"
                            >
                              CAN
                            </abbr>
                            <span
                              className={cn(
                                styles.tournamentBracketFlag,
                                "flag-icon",
                                "flag-icon-ca"
                              )}
                              aria-label="Flag"
                            ></span>
                          </td>
                          <td className={cn(styles.tournamentBracketScore)}>
                            <span
                              className={cn(styles.tournamentBracketNumber)}
                            >
                              4
                            </span>
                          </td>
                        </tr>
                        <tr className={cn(styles.tournamentBracketTeam)}>
                          <td className={cn(styles.tournamentBracketCountry)}>
                            <abbr
                              className={cn(styles.tournamentBracketCode)}
                              title="Kazakhstan"
                            >
                              KAZ
                            </abbr>
                            <span
                              className={cn(
                                styles.tournamentBracketFlag,
                                "flag-icon",
                                "flag-icon-kz"
                              )}
                              aria-label="Flag"
                            ></span>
                          </td>
                          <td className={cn(styles.tournamentBracketScore)}>
                            <span
                              className={cn(styles.tournamentBracketNumber)}
                            >
                              1
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>
                <li className={cn(styles.tournamentBracketItem)}>
                  <div className={cn(styles.tournamentBracketMatch)}>
                    <table className={cn(styles.tournamentBracketTable)}>
                      <caption className={cn(styles.tournamentBracketCaption)}>
                        <time>18 February 1998</time>
                      </caption>
                      <thead className={cn(styles.srOnly)}>
                        <tr>
                          <th>Country</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody className={cn(styles.tournamentBracketContent)}>
                        <tr
                          className={cn(
                            styles.tournamentBracketTeam,
                            "tournamentBracketTeamWinner"
                          )}
                        >
                          <td className={cn(styles.tournamentBracketCountry)}>
                            <abbr
                              className={cn(styles.tournamentBracketCode)}
                              title="Canada"
                            >
                              CAN
                            </abbr>
                            <span
                              className={cn(
                                styles.tournamentBracketFlag,
                                "flag-icon",
                                "flag-icon-ca"
                              )}
                              aria-label="Flag"
                            ></span>
                          </td>
                          <td className={cn(styles.tournamentBracketScore)}>
                            <span
                              className={cn(styles.tournamentBracketNumber)}
                            >
                              4
                            </span>
                          </td>
                        </tr>
                        <tr className={cn(styles.tournamentBracketTeam)}>
                          <td className={cn(styles.tournamentBracketCountry)}>
                            <abbr
                              className={cn(styles.tournamentBracketCode)}
                              title="Kazakhstan"
                            >
                              KAZ
                            </abbr>
                            <span
                              className={cn(
                                styles.tournamentBracketFlag,
                                "flag-icon",
                                "flag-icon-kz"
                              )}
                              aria-label="Flag"
                            ></span>
                          </td>
                          <td className={cn(styles.tournamentBracketScore)}>
                            <span
                              className={cn(styles.tournamentBracketNumber)}
                            >
                              1
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>
                <li className={cn(styles.tournamentBracketItem)}>
                  <div className={cn(styles.tournamentBracketMatch)}>
                    <table className={cn(styles.tournamentBracketTable)}>
                      <caption className={cn(styles.tournamentBracketCaption)}>
                        <time>18 February 1998</time>
                      </caption>
                      <thead className={cn(styles.srOnly)}>
                        <tr>
                          <th>Country</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody className={cn(styles.tournamentBracketContent)}>
                        <tr
                          className={cn(
                            styles.tournamentBracketTeam,
                            "tournamentBracketTeamWinner"
                          )}
                        >
                          <td className={cn(styles.tournamentBracketCountry)}>
                            <abbr
                              className={cn(styles.tournamentBracketCode)}
                              title="Canada"
                            >
                              CAN
                            </abbr>
                            <span
                              className={cn(
                                styles.tournamentBracketFlag,
                                "flag-icon",
                                "flag-icon-ca"
                              )}
                              aria-label="Flag"
                            ></span>
                          </td>
                          <td className={cn(styles.tournamentBracketScore)}>
                            <span
                              className={cn(styles.tournamentBracketNumber)}
                            >
                              4
                            </span>
                          </td>
                        </tr>
                        <tr className={cn(styles.tournamentBracketTeam)}>
                          <td className={cn(styles.tournamentBracketCountry)}>
                            <abbr
                              className={cn(styles.tournamentBracketCode)}
                              title="Kazakhstan"
                            >
                              KAZ
                            </abbr>
                            <span
                              className={cn(
                                styles.tournamentBracketFlag,
                                "flag-icon",
                                "flag-icon-kz"
                              )}
                              aria-label="Flag"
                            ></span>
                          </td>
                          <td className={cn(styles.tournamentBracketScore)}>
                            <span
                              className={cn(styles.tournamentBracketNumber)}
                            >
                              1
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>
                <li className={cn(styles.tournamentBracketItem)}>
                  <div className={cn(styles.tournamentBracketMatch)}>
                    <table className={cn(styles.tournamentBracketTable)}>
                      <caption className={cn(styles.tournamentBracketCaption)}>
                        <time>18 February 1998</time>
                      </caption>
                      <thead className={cn(styles.srOnly)}>
                        <tr>
                          <th>Country</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody className={cn(styles.tournamentBracketContent)}>
                        <tr
                          className={cn(
                            styles.tournamentBracketTeam,
                            "tournamentBracketTeamWinner"
                          )}
                        >
                          <td className={cn(styles.tournamentBracketCountry)}>
                            <abbr
                              className={cn(styles.tournamentBracketCode)}
                              title="Canada"
                            >
                              CAN
                            </abbr>
                            <span
                              className={cn(
                                styles.tournamentBracketFlag,
                                "flag-icon",
                                "flag-icon-ca"
                              )}
                              aria-label="Flag"
                            ></span>
                          </td>
                          <td className={cn(styles.tournamentBracketScore)}>
                            <span
                              className={cn(styles.tournamentBracketNumber)}
                            >
                              4
                            </span>
                          </td>
                        </tr>
                        <tr className={cn(styles.tournamentBracketTeam)}>
                          <td className={cn(styles.tournamentBracketCountry)}>
                            <abbr
                              className={cn(styles.tournamentBracketCode)}
                              title="Kazakhstan"
                            >
                              KAZ
                            </abbr>
                            <span
                              className={cn(
                                styles.tournamentBracketFlag,
                                "flag-icon",
                                "flag-icon-kz"
                              )}
                              aria-label="Flag"
                            ></span>
                          </td>
                          <td className={cn(styles.tournamentBracketScore)}>
                            <span
                              className={cn(styles.tournamentBracketNumber)}
                            >
                              1
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>
              </ul>
            </div>
            <div className={cn(styles.tournamentBracketRound)}>
              <h3 className={cn(styles.tournamentBracketRoundTitle)}>
                SemiFinals
              </h3>
              <ul className={cn(styles.tournamentBracketList)}>
                <li className={cn(styles.tournamentBracketItem)}>
                  <div className={cn(styles.tournamentBracketMatch)}>
                    <table className={cn(styles.tournamentBracketTable)}>
                      <caption className={cn(styles.tournamentBracketCaption)}>
                        <time>18 February 1998</time>
                      </caption>
                      <thead className={cn(styles.srOnly)}>
                        <tr>
                          <th>Country</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody className={cn(styles.tournamentBracketContent)}>
                        <tr
                          className={cn(
                            styles.tournamentBracketTeam,
                            "tournamentBracketTeamWinner"
                          )}
                        >
                          <td className={cn(styles.tournamentBracketCountry)}>
                            <abbr
                              className={cn(styles.tournamentBracketCode)}
                              title="Canada"
                            >
                              CAN
                            </abbr>
                            <span
                              className={cn(
                                styles.tournamentBracketFlag,
                                "flag-icon",
                                "flag-icon-ca"
                              )}
                              aria-label="Flag"
                            ></span>
                          </td>
                          <td className={cn(styles.tournamentBracketScore)}>
                            <span
                              className={cn(styles.tournamentBracketNumber)}
                            >
                              4
                            </span>
                          </td>
                        </tr>
                        <tr className={cn(styles.tournamentBracketTeam)}>
                          <td className={cn(styles.tournamentBracketCountry)}>
                            <abbr
                              className={cn(styles.tournamentBracketCode)}
                              title="Kazakhstan"
                            >
                              KAZ
                            </abbr>
                            <span
                              className={cn(
                                styles.tournamentBracketFlag,
                                "flag-icon",
                                "flag-icon-kz"
                              )}
                              aria-label="Flag"
                            ></span>
                          </td>
                          <td className={cn(styles.tournamentBracketScore)}>
                            <span
                              className={cn(styles.tournamentBracketNumber)}
                            >
                              1
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>
                <li className={cn(styles.tournamentBracketItem)}>
                  <div className={cn(styles.tournamentBracketMatch)}>
                    <table className={cn(styles.tournamentBracketTable)}>
                      <caption className={cn(styles.tournamentBracketCaption)}>
                        <time>18 February 1998</time>
                      </caption>
                      <thead className={cn(styles.srOnly)}>
                        <tr>
                          <th>Country</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody className={cn(styles.tournamentBracketContent)}>
                        <tr
                          className={cn(
                            styles.tournamentBracketTeam,
                            "tournamentBracketTeamWinner"
                          )}
                        >
                          <td className={cn(styles.tournamentBracketCountry)}>
                            <abbr
                              className={cn(styles.tournamentBracketCode)}
                              title="Canada"
                            >
                              CAN
                            </abbr>
                            <span
                              className={cn(
                                styles.tournamentBracketFlag,
                                "flag-icon",
                                "flag-icon-ca"
                              )}
                              aria-label="Flag"
                            ></span>
                          </td>
                          <td className={cn(styles.tournamentBracketScore)}>
                            <span
                              className={cn(styles.tournamentBracketNumber)}
                            >
                              4
                            </span>
                          </td>
                        </tr>
                        <tr className={cn(styles.tournamentBracketTeam)}>
                          <td className={cn(styles.tournamentBracketCountry)}>
                            <abbr
                              className={cn(styles.tournamentBracketCode)}
                              title="Kazakhstan"
                            >
                              KAZ
                            </abbr>
                            <span
                              className={cn(
                                styles.tournamentBracketFlag,
                                "flag-icon",
                                "flag-icon-kz"
                              )}
                              aria-label="Flag"
                            ></span>
                          </td>
                          <td className={cn(styles.tournamentBracketScore)}>
                            <span
                              className={cn(styles.tournamentBracketNumber)}
                            >
                              1
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>
              </ul>
            </div>
            <div className={cn(styles.tournamentBracketRound)}>
              <h3 className={cn(styles.tournamentBracketRoundTitle)}>
                goldFinals
              </h3>
              <ul className={cn(styles.tournamentBracketList)}>
                <li className={cn(styles.tournamentBracketItem)}>
                  <div className={cn(styles.tournamentBracketMatch)}>
                    <table className={cn(styles.tournamentBracketTable)}>
                      <caption className={cn(styles.tournamentBracketCaption)}>
                        <time>18 February 1998</time>
                      </caption>
                      <thead className={cn(styles.srOnly)}>
                        <tr>
                          <th>Country</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody className={cn(styles.tournamentBracketContent)}>
                        <tr
                          className={cn(
                            styles.tournamentBracketTeam,
                            "tournamentBracketTeamWinner"
                          )}
                        >
                          <td className={cn(styles.tournamentBracketCountry)}>
                            <abbr
                              className={cn(styles.tournamentBracketCode)}
                              title="Canada"
                            >
                              CAN
                            </abbr>
                            <span
                              className={cn(
                                styles.tournamentBracketFlag,
                                "flag-icon",
                                "flag-icon-ca"
                              )}
                              aria-label="Flag"
                            ></span>
                          </td>
                          <td className={cn(styles.tournamentBracketScore)}>
                            <span
                              className={cn(styles.tournamentBracketNumber)}
                            >
                              4
                            </span>
                          </td>
                        </tr>
                        <tr className={cn(styles.tournamentBracketTeam)}>
                          <td className={cn(styles.tournamentBracketCountry)}>
                            <abbr
                              className={cn(styles.tournamentBracketCode)}
                              title="Kazakhstan"
                            >
                              KAZ
                            </abbr>
                            <span
                              className={cn(
                                styles.tournamentBracketFlag,
                                "flag-icon",
                                "flag-icon-kz"
                              )}
                              aria-label="Flag"
                            ></span>
                          </td>
                          <td className={cn(styles.tournamentBracketScore)}>
                            <span
                              className={cn(styles.tournamentBracketNumber)}
                            >
                              1
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>
              </ul>
            </div>
            <div className={cn(styles.tournamentBracketRound)}>
              <h3 className={cn(styles.tournamentBracketRoundTitle)}>
                BronzeFinals
              </h3>
              <ul className={cn(styles.tournamentBracketList)}>
                <li className={cn(styles.tournamentBracketItem)}>
                  <div className={cn(styles.tournamentBracketMatch)}>
                    <table className={cn(styles.tournamentBracketTable)}>
                      <caption className={cn(styles.tournamentBracketCaption)}>
                        <time>18 February 1998</time>
                      </caption>
                      <thead className={cn(styles.srOnly)}>
                        <tr>
                          <th>Country</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody className={cn(styles.tournamentBracketContent)}>
                        <tr
                          className={cn(
                            styles.tournamentBracketTeam,
                            "tournamentBracketTeamWinner"
                          )}
                        >
                          <td className={cn(styles.tournamentBracketCountry)}>
                            <abbr
                              className={cn(styles.tournamentBracketCode)}
                              title="Canada"
                            >
                              CAN
                            </abbr>
                            <span
                              className={cn(
                                styles.tournamentBracketFlag,
                                "flag-icon",
                                "flag-icon-ca"
                              )}
                              aria-label="Flag"
                            ></span>
                          </td>
                          <td className={cn(styles.tournamentBracketScore)}>
                            <span
                              className={cn(styles.tournamentBracketNumber)}
                            >
                              4
                            </span>
                          </td>
                        </tr>
                        <tr className={cn(styles.tournamentBracketTeam)}>
                          <td className={cn(styles.tournamentBracketCountry)}>
                            <abbr
                              className={cn(styles.tournamentBracketCode)}
                              title="Kazakhstan"
                            >
                              KAZ
                            </abbr>
                            <span
                              className={cn(
                                styles.tournamentBracketFlag,
                                "flag-icon",
                                "flag-icon-kz"
                              )}
                              aria-label="Flag"
                            ></span>
                          </td>
                          <td className={cn(styles.tournamentBracketScore)}>
                            <span
                              className={cn(styles.tournamentBracketNumber)}
                            >
                              1
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMyTournament;
