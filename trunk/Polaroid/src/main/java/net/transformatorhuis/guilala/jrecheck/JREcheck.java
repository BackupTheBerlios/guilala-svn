package net.transformatorhuis.guilala.jrecheck;

import netscape.javascript.*;
import java.applet.*;
import java.awt.*;
import java.util.Timer;
import java.util.TimerTask;

public class JREcheck extends Applet {
	public static final long serialVersionUID = 1;
	Timer timer;
	Image image;
	String imageUrl;
	
	public void init() {
		setBackground(Color.white);
		
		Tester res = new Tester();
		System.out.println("java vendor: " + res.javaVendor);
		System.out.println("java version: " + res.javaVersion);
		System.out.println("java class version: " + res.javaClassVersion);
		System.out.println("java OS architecture: " + res.osArch);
		System.out.println("java OS name: " + res.osName);
		System.out.println("java applet width: " + res.appletWidth);
		System.out.println("java applet height: " + res.appletHeight);
		
		Object[] scriptObject = {res};
		
		JSObject htmlDoc = JSObject.getWindow(this); // this is applet
		htmlDoc.call("jreInfo", scriptObject); // String[] tst = { "no lol" };
		
		imageUrl = htmlDoc.getMember("jrePic").toString();
		new Delay(500);
	}
	
    public void paint(Graphics g) {
        // Draw image
        g.drawImage(image, 0, 0, this);
    }
    
	public class DrawImage{
	    public DrawImage(String file) {
	        image = getImage(getDocumentBase(), file); // Load image
	    }
	}

	public class Tester{
		public static final long serialVersionUID = 2;
		public int appletWidth, appletHeight;
		public String javaVersion, javaVendor, javaClassVersion, osArch, osName;
		public Tester(){
			this.javaVersion = System.getProperty("java.version");
			this.javaVendor = System.getProperty("java.vendor");
			this.javaClassVersion = System.getProperty("java.class.version");
			
			this.appletWidth = getSize().width;
			this.appletHeight = getSize().height;
			
			this.osArch = System.getProperty("os.arch");
			this.osName = System.getProperty("os.name");
		}
	}
	
	public class Delay{
		public Delay(int ms) {
			timer = new Timer();
			timer.schedule(new DelayTask(), ms);
		}
		
		class DelayTask extends TimerTask {
			public void run() {
				System.out.println("Draw java image: " + imageUrl);
				new DrawImage(imageUrl);
				repaint(); // repaint applet graphics
				timer.cancel(); //Terminate the timer thread
			}
		}
	}
}

