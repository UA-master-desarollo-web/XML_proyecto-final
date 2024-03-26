<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:template match="/">
        <html>
            <head>
                <link rel="stylesheet" type="text/css" href="styles.css" />
            </head>
            <body>
                <xsl:apply-templates select="//row">
                    <xsl:sort select="documentName"/>
                </xsl:apply-templates>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="row">
        <div>
            <h2>
                Localidad #
                <xsl:value-of select="position()"/>
            </h2>
            <xsl:apply-templates select="documentName"/>
            <xsl:apply-templates select="marks"/>
            <xsl:apply-templates select="documentDescription"/>
            <xsl:apply-templates select="country"/>
            <xsl:apply-templates select="latwgs84"/>
            <xsl:apply-templates select="lonwgs84"/>
            <xsl:apply-templates select="territory"/>
            <xsl:apply-templates select="friendlyUrl"/>
        </div>
    </xsl:template>

    <xsl:template match="documentName">
        <h3>
            <xsl:value-of select="."/>
            🚩
        </h3>
    </xsl:template>

    <xsl:template match="marks">
        <h4 style="color:#1f7a8c;font-weight:bold;">
            <xsl:value-of select="."/>
        </h4>
    </xsl:template>

    <xsl:template match="documentDescription">
        <p style="color:#003049">
            <b>Descripcion: </b>
            <xsl:value-of select="."/>
        </p>
    </xsl:template>

    <xsl:template match="country">
        <p>
            <b>País: </b>
            <xsl:value-of select="."/>
        </p>
    </xsl:template>

    <xsl:template match="latwgs84">
        <p>
            <b> Latitud:</b>
            <xsl:value-of select="."/>
        </p>
    </xsl:template>

    <xsl:template match="lonwgs84">
        <p>
            <b>Longitud:</b>
            <xsl:value-of select="."/>
        </p>
    </xsl:template>

    <xsl:template match="territory">
        <xsl:choose>
            <xsl:when test=". = 'Araba/Álava'">
                <section>
                    <h5>Álava 🏞️</h5>
                    <br/>
                    <img src="Alava.svg" alt="Bandera de Alava" height="100"/>
                </section>


            </xsl:when>

            <xsl:when test=". = 'Gipuzkoa'">
                <section>
                    <h5>Guipuzcoa 🚗</h5>
                    <br/>
                    <img src="Guipuzcoa.png" alt="Bandera de Guipuzcoa" height="100"/>

                </section>
            </xsl:when>

            <xsl:when test=". = 'Bizkaia'">
                <section>
                    <h5>Bizkaia 🧭</h5>
                    <br/>
                    <img src="Bizkaia.png" alt="Bandera de Bizkaia" height="100"/>
                </section>
            </xsl:when>

            <xsl:otherwise>
                <section>
                    <h5>Sin datos del territorio </h5>
                </section>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <xsl:template match="friendlyUrl">
        <a href="{.}">Ver más</a>
    </xsl:template>

</xsl:stylesheet>
